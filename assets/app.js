(function(){
  'use strict';

  const ui = {
    output: document.getElementById('output'),
    entropy: document.getElementById('entropy'),
    strength: document.getElementById('strength'),
    strengthText: document.getElementById('strength-text'),
    btnGenerate: document.getElementById('btn-generate'),
    btnCopy: document.getElementById('btn-copy'),
    toggleMask: document.getElementById('toggle-mask'),
    length: document.getElementById('length'),
    lengthVal: document.getElementById('length-val'),
    setUpper: document.getElementById('set-upper'),
    setLower: document.getElementById('set-lower'),
    setDigit: document.getElementById('set-digit'),
    setSymbol: document.getElementById('set-symbol'),
    excludeSimilar: document.getElementById('exclude-similar'),
    requireClasses: document.getElementById('require-classes'),
    maxRepeat: document.getElementById('max-repeat'),
    pattern: document.getElementById('pattern'),
    usePassphrase: document.getElementById('use-passphrase'),
    wordsCount: document.getElementById('words-count'),
    wordsSep: document.getElementById('words-sep'),
    batchCount: document.getElementById('batch-count'),
    btnBatch: document.getElementById('btn-batch'),
    btnExportTxt: document.getElementById('btn-export-txt'),
    btnExportCsv: document.getElementById('btn-export-csv'),
    batchOutput: document.getElementById('batch-output'),
  };

  const similarChars = new Set(['0','O','o','1','l','I']);
  const SYMBOLS = "!@#$%^&*()-_=+[]{};:'\",.<>/?`~|\\"; // escaped backslash

  function assertCSPRNG(){
    if(!(window.crypto && window.crypto.getRandomValues)){
      throw new Error('当前环境不支持 CSPRNG (window.crypto.getRandomValues)');
    }
  }

  function getRandomBytes(size){
    assertCSPRNG();
    const bytes = new Uint8Array(size);
    window.crypto.getRandomValues(bytes);
    return bytes;
  }

  function buildCharset(options){
    const {upper, lower, digit, symbol, excludeSimilar} = options;
    let charset = [];
    if(upper){ for(let c=65;c<=90;c++){ charset.push(String.fromCharCode(c)); } }
    if(lower){ for(let c=97;c<=122;c++){ charset.push(String.fromCharCode(c)); } }
    if(digit){ for(let c=48;c<=57;c++){ charset.push(String.fromCharCode(c)); } }
    if(symbol){ charset = charset.concat(Array.from(SYMBOLS)); }
    if(excludeSimilar){ charset = charset.filter(ch => !similarChars.has(ch)); }
    return charset;
  }

  function pickUniformIndices(count, modulo){
    // 拒绝采样，避免模偏
    const out = new Uint32Array(count);
    const limit = Math.floor(256 / modulo) * modulo;
    let i = 0;
    while(i < count){
      const bytes = getRandomBytes(128);
      for(let b of bytes){
        if(b < limit){ out[i++] = b % modulo; if(i===count) break; }
      }
    }
    return out;
  }

  function enforceMaxRepeat(text, maxRepeat){
    if(!maxRepeat || maxRepeat <= 0) return text;
    const chars = text.split('');
    for(let i=1, run=1; i<chars.length; i++){
      if(chars[i] === chars[i-1]){
        run++;
        if(run > maxRepeat){
          // 强制替换为不同字符（从同字符集随机选）
          const pool = buildCharsetFromCurrent();
          let replacement = chars[i];
          while(replacement === chars[i]){
            const idx = pickUniformIndices(1, pool.length)[0];
            replacement = pool[idx];
          }
          chars[i] = replacement;
          run = 1;
        }
      } else {
        run = 1;
      }
    }
    return chars.join('');
  }

  function calcEntropyBitsByCharset(len, charsetSize){
    if(len <= 0 || charsetSize <= 1) return 0;
    const bits = len * Math.log2(charsetSize);
    return Math.round(bits * 100) / 100;
  }

  function strengthFromEntropy(bits){
    // 简单阈值：<28 极弱，<36 弱，<60 中，<80 强，否则 很强
    if(bits < 28) return {level:0, label:t('weak')};
    if(bits < 36) return {level:1, label:t('weak')};
    if(bits < 60) return {level:2, label:t('medium')};
    if(bits < 80) return {level:3, label:t('strong')};
    return {level:4, label:t('veryStrong')};
  }

  function applyMask(text, masked){
    return masked ? '•'.repeat(text.length) : text;
  }

  function buildCharsetFromCurrent(){
    return buildCharset({
      upper: ui.setUpper.checked,
      lower: ui.setLower.checked,
      digit: ui.setDigit.checked,
      symbol: ui.setSymbol.checked,
      excludeSimilar: ui.excludeSimilar.checked,
    });
  }

  function generateByCharset(len){
    const charset = buildCharsetFromCurrent();
    if(charset.length === 0) throw new Error('至少选择一种字符集');
    const idxs = pickUniformIndices(len, charset.length);
    let pwd = Array.from(idxs, i => charset[i]).join('');

    if(ui.requireClasses.checked){
      // 保证每类至少一个
      const classes = [];
      if(ui.setUpper.checked) classes.push(Array.from({length:26},(_,k)=>String.fromCharCode(65+k)));
      if(ui.setLower.checked) classes.push(Array.from({length:26},(_,k)=>String.fromCharCode(97+k)));
      if(ui.setDigit.checked) classes.push(Array.from({length:10},(_,k)=>String.fromCharCode(48+k)));
      if(ui.setSymbol.checked) classes.push(Array.from(SYMBOLS));
      // 过滤相似
      if(ui.excludeSimilar.checked){
        for(let i=0;i<classes.length;i++){
          classes[i] = classes[i].filter(ch => !similarChars.has(ch));
        }
      }
      // 替换前N个位置为每类随机一个，随后打乱
      const positions = [...Array(pwd.length).keys()];
      shuffleInPlace(positions);
      const chars = pwd.split('');
      const needed = Math.min(classes.length, chars.length);
      for(let ci=0; ci<needed; ci++){
        const pos = positions[ci];
        const pool = classes[ci];
        if(pool.length === 0) continue;
        const idx = pickUniformIndices(1, pool.length)[0];
        chars[pos] = pool[idx];
      }
      pwd = chars.join('');
    }

    const maxRepeat = Number(ui.maxRepeat.value);
    pwd = enforceMaxRepeat(pwd, maxRepeat);
    return pwd;
  }

  function shuffleInPlace(arr){
    for(let i=arr.length-1;i>0;i--){
      const j = pickUniformIndices(1, i+1)[0];
      const tmp = arr[i]; arr[i]=arr[j]; arr[j]=tmp;
    }
    return arr;
  }

  // 简易英文短词表（示例，体积小；可后续替换更大词表）
  const SMALL_WORDLIST = (
    'able,acid,aged,also,area,army,away,baby,back,ball,band,bank,base,'+
    'bath,bean,bear,beat,been,beer,bell,belt,best,bill,bird,blow,blue,'+
    'boat,body,bomb,bond,bone,book,boom,boot,born,boss,both,bowl,bulk,'+
    'burn,bush,busy,butt,cake,call,calm,camp,card,care,case,cash,cast,'+
    'cell,chat,chip,city,club,coal,coast,coat,code,cold,come,cook,cool,'+
    'cope,copy,core,cost,crew,crop,dark,data,date,dawn,dead,deal,deck,'+
    'deep,deny,desk,diet,disc,dish,door,down,draw,drop,drum,duck,dust'
  ).split(',');

  function generatePassphrase(words, sep){
    const out = [];
    const modulo = SMALL_WORDLIST.length;
    for(let i=0;i<words;i++){
      const idx = pickUniformIndices(1, modulo)[0];
      out.push(SMALL_WORDLIST[idx]);
    }
    return out.join(sep);
  }

  function generateFromPattern(pattern){
    const mapping = {
      'A': () => randomFromRanges([[65,90],[97,122]]), // letter any case
      'a': () => randomFromRanges([[97,122]]),
      'U': () => randomFromRanges([[65,90]]),
      '9': () => randomFromRanges([[48,57]]),
      '#': () => randomFromSet(Array.from(SYMBOLS)),
      '*': () => randomFromSet(buildCharsetFromCurrent()),
    };
    const out = [];
    for(const ch of pattern){
      const gen = mapping[ch];
      if(!gen){ out.push(ch); continue; }
      let v = gen();
      if(ui.excludeSimilar.checked){
        // 替换直到不相似
        let guard=0;
        while(similarChars.has(v) && guard++ < 32){ v = gen(); }
      }
      out.push(v);
    }
    return out.join('');
  }

  function randomFromRanges(ranges){
    const pool = [];
    for(const [a,b] of ranges){ for(let c=a;c<=b;c++) pool.push(String.fromCharCode(c)); }
    const idx = pickUniformIndices(1, pool.length)[0];
    return pool[idx];
  }
  function randomFromSet(pool){
    if(!pool || pool.length===0) throw new Error('占位符可用字符集为空');
    const idx = pickUniformIndices(1, pool.length)[0];
    return pool[idx];
  }

  function updateUIWith(text){
    const masked = ui.toggleMask.checked;
    ui.output.textContent = applyMask(text, masked);
    const charset = buildCharsetFromCurrent();
    const bits = ui.usePassphrase.checked
      ? Math.round((text.split(ui.wordsSep.value).length * Math.log2(SMALL_WORDLIST.length))*100)/100
      : calcEntropyBitsByCharset(text.length, Math.max(charset.length,1));
    ui.entropy.textContent = String(bits);
    const st = strengthFromEntropy(bits);
    ui.strength.value = st.level;
    ui.strengthText.textContent = st.label;
  }

  function generateOnce(){
    const text = generateSingle();
    updateUIWith(text);
    return text;
  }

  function generateSingle(){
    const len = Number(ui.length.value);
    const pattern = (ui.pattern.value||'').trim();
    if(ui.usePassphrase.checked){
      const wc = clamp(Number(ui.wordsCount.value)||4, 2, 12);
      const sep = (ui.wordsSep.value||'-').slice(0,3);
      return generatePassphrase(wc, sep);
    }
    if(pattern.length>0){
      return generateFromPattern(pattern);
    }
    return generateByCharset(len);
  }

  function clamp(v,min,max){ return Math.max(min, Math.min(max, v)); }

  async function copyCurrent(){
    const masked = ui.toggleMask.checked;
    const text = ui.output.textContent || '';
    const real = masked ? (window.__lastRealPwd || '') : text;
    if(!real){ return; }
    try{
      await navigator.clipboard.writeText(real);
      flash(ui.btnCopy, t('copied'));
    }catch{
      // 降级：选中输出区域
      selectText(ui.output);
    }
  }

  function flash(el, label){
    const old = el.textContent;
    el.textContent = label;
    setTimeout(()=>{ el.textContent = old; }, 900);
  }

  function selectText(el){
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  function onMaskToggle(){
    const real = window.__lastRealPwd || '';
    if(!real) return;
    ui.output.textContent = applyMask(real, ui.toggleMask.checked);
  }

  function batchGenerate(){
    const n = clamp(Number(ui.batchCount.value)||1, 1, 10000);
    const lines = [];
    for(let i=0;i<n;i++){
      lines.push(generateSingle());
    }
    // 批量完成后再一次性更新UI（取最后一个样本）
    const last = lines[lines.length-1] || '';
    updateUIWith(last);
    window.__lastRealPwd = last;
    ui.batchOutput.value = lines.join('\n');
  }

  function exportBlob(text, filename){
    const blob = new Blob([text], {type:'text/plain;charset=utf-8'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); }, 0);
  }

  function onExportTXT(){
    const text = ui.batchOutput.value || (window.__lastRealPwd || '');
    if(!text) return;
    exportBlob(text, 'passwords.txt');
  }

  function onExportCSV(){
    const text = ui.batchOutput.value || (window.__lastRealPwd || '');
    if(!text) return;
    const rows = text.split('\n').map((t,i)=>`${i+1},"${t.replace(/"/g,'""')}"`).join('\n');
    exportBlob(`index,password\n${rows}`, 'passwords.csv');
  }

  function bind(){
    ui.length.addEventListener('input', ()=>{ ui.lengthVal.textContent = ui.length.value; });
    ui.toggleMask.addEventListener('change', onMaskToggle);
    ui.btnGenerate.addEventListener('click', (e)=>{ e.preventDefault(); const t = generateOnce(); window.__lastRealPwd = t; });
    ui.btnCopy.addEventListener('click', (e)=>{ e.preventDefault(); copyCurrent(); });
    ui.btnBatch.addEventListener('click', (e)=>{ e.preventDefault(); batchGenerate(); });
    ui.btnExportTxt.addEventListener('click', (e)=>{ e.preventDefault(); onExportTXT(); });
    ui.btnExportCsv.addEventListener('click', (e)=>{ e.preventDefault(); onExportCSV(); });
    
    // 语言切换
    const langSelect = document.getElementById('lang-select');
    if(langSelect){
      langSelect.addEventListener('change', (e)=>{ switchLanguage(e.target.value); });
    }
    
    // 即时更新强度预览
    ['change','input'].forEach(evt=>{
      document.getElementById('form').addEventListener(evt, ()=>{
        if(window.__lastRealPwd){ updateUIWith(window.__lastRealPwd); }
      });
    });
  }

  // 初始
  initLanguage();
  bind();
  const initial = generateOnce();
  window.__lastRealPwd = initial;
})();
