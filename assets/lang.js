// 多语言支持
const LANGUAGES = {
  en: {
    title: 'Password Generator',
    subtitle: 'Secure • Local • Private',
    resultTitle: 'Generated Result',
    generate: 'Generate',
    copy: 'Copy',
    mask: 'Mask',
    entropy: 'Entropy',
    strength: 'Strength',
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong',
    veryStrong: 'Very Strong',
    configTitle: 'Configuration',
    length: 'Length',
    charset: 'Character Set',
    uppercase: 'Uppercase A–Z',
    lowercase: 'Lowercase a–z',
    digits: 'Digits 0–9',
    symbols: 'Symbols !@#…',
    rules: 'Rules',
    excludeSimilar: 'Exclude similar chars (0 O 1 l I)',
    requireClasses: 'Must include selected classes',
    maxRepeat: 'Max consecutive repeats',
    noLimit: 'No limit',
    template: 'Template (Optional)',
    templatePlaceholder: 'e.g.: A9!A9 or leave empty',
    templateHelp: 'Placeholders: A=letter, a=lowercase, U=uppercase, 9=digit, #=symbol, *=any',
    passphrase: 'Passphrase (Optional)',
    wordCount: 'Word count',
    separator: 'Separator',
    usePassphrase: 'Use passphrase mode',
    batchTitle: 'Batch & Export',
    count: 'Count',
    batchGenerate: 'Batch Generate',
    exportTxt: 'Export TXT',
    exportCsv: 'Export CSV',
    batchPlaceholder: 'Batch results will appear here',
    copied: 'Copied',
    copyright: '© 2025 Darrel. All rights reserved.',
    selectLanguage: 'Select Language'
  },
  zh: {
    title: '密码生成器',
    subtitle: '安全 • 本地 • 私密',
    resultTitle: '生成结果',
    generate: '生成',
    copy: '复制',
    mask: '掩码',
    entropy: '熵',
    strength: '强度',
    weak: '弱',
    medium: '中',
    strong: '强',
    veryStrong: '很强',
    configTitle: '策略配置',
    length: '长度',
    charset: '字符集',
    uppercase: '大写 A–Z',
    lowercase: '小写 a–z',
    digits: '数字 0–9',
    symbols: '符号 !@#…',
    rules: '规则',
    excludeSimilar: '排除相似字符 (0 O 1 l I)',
    requireClasses: '必须包含所选类别',
    maxRepeat: '连续重复上限',
    noLimit: '不限制',
    template: '模板（可选）',
    templatePlaceholder: '例如: A9!A9 或留空',
    templateHelp: '占位符：A=字母、a=小写、U=大写、9=数字、#=符号、*=任意',
    passphrase: '词语口令（可选）',
    wordCount: '词数',
    separator: '分隔符',
    usePassphrase: '使用词语口令模式',
    batchTitle: '批量与导出',
    count: '数量',
    batchGenerate: '批量生成',
    exportTxt: '导出 TXT',
    exportCsv: '导出 CSV',
    batchPlaceholder: '批量结果会显示在此',
    copied: '已复制',
    copyright: '© 2025 Darrel. 版权所有。',
    selectLanguage: '选择语言'
  },
  de: {
    title: 'Passwort-Generator',
    subtitle: 'Sicher • Lokal • Privat',
    resultTitle: 'Generiertes Ergebnis',
    generate: 'Generieren',
    copy: 'Kopieren',
    mask: 'Maskieren',
    entropy: 'Entropie',
    strength: 'Stärke',
    weak: 'Schwach',
    medium: 'Mittel',
    strong: 'Stark',
    veryStrong: 'Sehr Stark',
    configTitle: 'Konfiguration',
    length: 'Länge',
    charset: 'Zeichensatz',
    uppercase: 'Großbuchstaben A–Z',
    lowercase: 'Kleinbuchstaben a–z',
    digits: 'Ziffern 0–9',
    symbols: 'Symbole !@#…',
    rules: 'Regeln',
    excludeSimilar: 'Ähnliche Zeichen ausschließen (0 O 1 l I)',
    requireClasses: 'Ausgewählte Klassen müssen enthalten sein',
    maxRepeat: 'Max. aufeinanderfolgende Wiederholungen',
    noLimit: 'Keine Begrenzung',
    template: 'Vorlage (Optional)',
    templatePlaceholder: 'z.B.: A9!A9 oder leer lassen',
    templateHelp: 'Platzhalter: A=Buchstabe, a=Kleinbuchstabe, U=Großbuchstabe, 9=Ziffer, #=Symbol, *=beliebig',
    passphrase: 'Passphrase (Optional)',
    wordCount: 'Wortanzahl',
    separator: 'Trennzeichen',
    usePassphrase: 'Passphrase-Modus verwenden',
    batchTitle: 'Batch & Export',
    count: 'Anzahl',
    batchGenerate: 'Batch generieren',
    exportTxt: 'TXT exportieren',
    exportCsv: 'CSV exportieren',
    batchPlaceholder: 'Batch-Ergebnisse werden hier angezeigt',
    copied: 'Kopiert',
    copyright: '© 2025 Darrel. Alle Rechte vorbehalten.',
    selectLanguage: 'Sprache wählen'
  },
  ru: {
    title: 'Генератор паролей',
    subtitle: 'Безопасно • Локально • Приватно',
    resultTitle: 'Сгенерированный результат',
    generate: 'Сгенерировать',
    copy: 'Копировать',
    mask: 'Маска',
    entropy: 'Энтропия',
    strength: 'Надёжность',
    weak: 'Слабая',
    medium: 'Средняя',
    strong: 'Сильная',
    veryStrong: 'Очень сильная',
    configTitle: 'Конфигурация',
    length: 'Длина',
    charset: 'Набор символов',
    uppercase: 'Заглавные A–Z',
    lowercase: 'Строчные a–z',
    digits: 'Цифры 0–9',
    symbols: 'Символы !@#…',
    rules: 'Правила',
    excludeSimilar: 'Исключить похожие символы (0 O 1 l I)',
    requireClasses: 'Должны содержать выбранные классы',
    maxRepeat: 'Макс. последовательных повторов',
    noLimit: 'Без ограничений',
    template: 'Шаблон (Опционально)',
    templatePlaceholder: 'напр.: A9!A9 или оставить пустым',
    templateHelp: 'Заполнители: A=буква, a=строчная, U=заглавная, 9=цифра, #=символ, *=любой',
    passphrase: 'Парольная фраза (Опционально)',
    wordCount: 'Количество слов',
    separator: 'Разделитель',
    usePassphrase: 'Использовать режим парольной фразы',
    batchTitle: 'Пакетная обработка и экспорт',
    count: 'Количество',
    batchGenerate: 'Пакетная генерация',
    exportTxt: 'Экспорт TXT',
    exportCsv: 'Экспорт CSV',
    batchPlaceholder: 'Результаты пакетной обработки появятся здесь',
    copied: 'Скопировано',
    copyright: '© 2025 Darrel. Все права защищены.',
    selectLanguage: 'Выбрать язык'
  },
  pt: {
    title: 'Gerador de Senhas',
    subtitle: 'Seguro • Local • Privado',
    resultTitle: 'Resultado Gerado',
    generate: 'Gerar',
    copy: 'Copiar',
    mask: 'Máscara',
    entropy: 'Entropia',
    strength: 'Força',
    weak: 'Fraca',
    medium: 'Média',
    strong: 'Forte',
    veryStrong: 'Muito Forte',
    configTitle: 'Configuração',
    length: 'Comprimento',
    charset: 'Conjunto de Caracteres',
    uppercase: 'Maiúsculas A–Z',
    lowercase: 'Minúsculas a–z',
    digits: 'Dígitos 0–9',
    symbols: 'Símbolos !@#…',
    rules: 'Regras',
    excludeSimilar: 'Excluir caracteres similares (0 O 1 l I)',
    requireClasses: 'Deve incluir classes selecionadas',
    maxRepeat: 'Máx. repetições consecutivas',
    noLimit: 'Sem limite',
    template: 'Modelo (Opcional)',
    templatePlaceholder: 'ex.: A9!A9 ou deixar vazio',
    templateHelp: 'Placeholders: A=letra, a=minúscula, U=maiúscula, 9=dígito, #=símbolo, *=qualquer',
    passphrase: 'Frase de Senha (Opcional)',
    wordCount: 'Número de palavras',
    separator: 'Separador',
    usePassphrase: 'Usar modo frase de senha',
    batchTitle: 'Lote e Exportar',
    count: 'Quantidade',
    batchGenerate: 'Gerar em Lote',
    exportTxt: 'Exportar TXT',
    exportCsv: 'Exportar CSV',
    batchPlaceholder: 'Resultados em lote aparecerão aqui',
    copied: 'Copiado',
    copyright: '© 2025 Darrel. Todos os direitos reservados.',
    selectLanguage: 'Selecionar idioma'
  },
  es: {
    title: 'Generador de Contraseñas',
    subtitle: 'Seguro • Local • Privado',
    resultTitle: 'Resultado Generado',
    generate: 'Generar',
    copy: 'Copiar',
    mask: 'Máscara',
    entropy: 'Entropía',
    strength: 'Fuerza',
    weak: 'Débil',
    medium: 'Media',
    strong: 'Fuerte',
    veryStrong: 'Muy Fuerte',
    configTitle: 'Configuración',
    length: 'Longitud',
    charset: 'Conjunto de Caracteres',
    uppercase: 'Mayúsculas A–Z',
    lowercase: 'Minúsculas a–z',
    digits: 'Dígitos 0–9',
    symbols: 'Símbolos !@#…',
    rules: 'Reglas',
    excludeSimilar: 'Excluir caracteres similares (0 O 1 l I)',
    requireClasses: 'Debe incluir clases seleccionadas',
    maxRepeat: 'Máx. repeticiones consecutivas',
    noLimit: 'Sin límite',
    template: 'Plantilla (Opcional)',
    templatePlaceholder: 'ej.: A9!A9 o dejar vacío',
    templateHelp: 'Marcadores: A=letra, a=minúscula, U=mayúscula, 9=dígito, #=símbolo, *=cualquiera',
    passphrase: 'Frase de Contraseña (Opcional)',
    wordCount: 'Número de palabras',
    separator: 'Separador',
    usePassphrase: 'Usar modo frase de contraseña',
    batchTitle: 'Lote y Exportar',
    count: 'Cantidad',
    batchGenerate: 'Generar en Lote',
    exportTxt: 'Exportar TXT',
    exportCsv: 'Exportar CSV',
    batchPlaceholder: 'Los resultados en lote aparecerán aquí',
    copied: 'Copiado',
    copyright: '© 2025 Darrel. Todos los derechos reservados.',
    selectLanguage: 'Seleccionar idioma'
  },
  vi: {
    title: 'Trình Tạo Mật Khẩu',
    subtitle: 'An Toàn • Cục Bộ • Riêng Tư',
    resultTitle: 'Kết Quả Được Tạo',
    generate: 'Tạo',
    copy: 'Sao Chép',
    mask: 'Mặt Nạ',
    entropy: 'Entropy',
    strength: 'Độ Mạnh',
    weak: 'Yếu',
    medium: 'Trung Bình',
    strong: 'Mạnh',
    veryStrong: 'Rất Mạnh',
    configTitle: 'Cấu Hình',
    length: 'Độ Dài',
    charset: 'Bộ Ký Tự',
    uppercase: 'Chữ Hoa A–Z',
    lowercase: 'Chữ Thường a–z',
    digits: 'Số 0–9',
    symbols: 'Ký Hiệu !@#…',
    rules: 'Quy Tắc',
    excludeSimilar: 'Loại trừ ký tự tương tự (0 O 1 l I)',
    requireClasses: 'Phải bao gồm các lớp đã chọn',
    maxRepeat: 'Tối đa lặp lại liên tiếp',
    noLimit: 'Không giới hạn',
    template: 'Mẫu (Tùy chọn)',
    templatePlaceholder: 'vd: A9!A9 hoặc để trống',
    templateHelp: 'Trình giữ chỗ: A=chữ cái, a=chữ thường, U=chữ hoa, 9=số, #=ký hiệu, *=bất kỳ',
    passphrase: 'Cụm Mật Khẩu (Tùy chọn)',
    wordCount: 'Số từ',
    separator: 'Dấu phân cách',
    usePassphrase: 'Sử dụng chế độ cụm mật khẩu',
    batchTitle: 'Hàng Loạt & Xuất',
    count: 'Số lượng',
    batchGenerate: 'Tạo Hàng Loạt',
    exportTxt: 'Xuất TXT',
    exportCsv: 'Xuất CSV',
    batchPlaceholder: 'Kết quả hàng loạt sẽ hiển thị ở đây',
    copied: 'Đã sao chép',
    copyright: '© 2025 Darrel. Tất cả quyền được bảo lưu.',
    selectLanguage: 'Chọn ngôn ngữ'
  }
};

// 默认语言
let currentLang = 'en';

// 获取翻译文本
function t(key) {
  return LANGUAGES[currentLang][key] || LANGUAGES['en'][key] || key;
}

// 切换语言
function switchLanguage(lang) {
  if (!LANGUAGES[lang]) return;
  currentLang = lang;
  localStorage.setItem('password-generator-lang', lang);
  updateUI();
}

// 更新界面文本
function updateUI() {
  // 更新所有带有 data-i18n 属性的元素
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  
  // 更新占位符
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });
  
  // 更新 aria-label
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    el.setAttribute('aria-label', t(key));
  });
  
  // 更新语言选择器
  const langSelect = document.getElementById('lang-select');
  if (langSelect) {
    langSelect.value = currentLang;
  }
}

// 初始化语言
function initLanguage() {
  const savedLang = localStorage.getItem('password-generator-lang');
  if (savedLang && LANGUAGES[savedLang]) {
    currentLang = savedLang;
  }
  updateUI();
}
