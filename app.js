/**
 * ==============================================================================
 * EXCEL ID CARD BADGE MANAGER FRONTEND LOGIC (app.js)
 * ==============================================================================
 */

// Card Size Presets
const CARD_PRESETS = {
  standard: { width: 55, height: 85, label: '55.0 × 85.0 mm (5.5 × 8.5 ซม.)' },
  custom: { width: 55, height: 85, label: 'Custom' }
};

// Default Element Layouts & Offsets for Visual Customizer
const DEFAULT_PORTRAIT_LAYOUT = {
  photo: { x: 0, y: 0, w: 125, h: 160 },
  logo: { x: 0, y: 0, w: 85, h: 76 },
  orgTitle: { x: 0, y: 0, fontSize: 42, fontWeight: '800', fontStyle: 'normal', color: '#ffffff', textAlign: 'center' },
  rank: { x: 0, y: 0, fontSize: 24, fontWeight: '800', fontStyle: 'normal', color: '#000000', textAlign: 'center' },
  thaiName: { x: 0, y: 0, fontSize: 26, fontWeight: '800', fontStyle: 'normal', color: '#000000', textAlign: 'center' },
  engName: { x: 0, y: 0, fontSize: 18, fontWeight: '700', fontStyle: 'normal', color: '#000000', textAlign: 'center' },
  bottomBlock: { x: 0, y: 0, fontSize: 14, fontWeight: '700', fontStyle: 'normal', color: '#000000', textAlign: 'right' },
  stripeOrder: { x: 0, y: 0, fontSize: 58, fontWeight: '800', fontStyle: 'normal', textAlign: 'center' }
};

const DEFAULT_LANDSCAPE_LAYOUT = {
  photo: { x: 0, y: 0, w: 125, h: 155 },
  logo: { x: 0, y: 0, w: 68, h: 68 },
  orgTitle: { x: 0, y: 0, fontSize: 38, fontWeight: '900', fontStyle: 'normal', color: '#000000', textAlign: 'left' },
  thaiName: { x: 0, y: 0, fontSize: 20, fontWeight: '800', fontStyle: 'normal', color: '#000000', textAlign: 'left' },
  workplace: { x: 0, y: 0, fontSize: 20, fontWeight: '800', fontStyle: 'normal', color: '#000000', textAlign: 'left' },
  period: { x: 0, y: 0, fontSize: 20, fontWeight: '800', fontStyle: 'normal', color: '#000000', textAlign: 'left' },
  docNum: { x: 0, y: 0, fontSize: 16, fontWeight: '800', fontStyle: 'normal', color: '#000000', textAlign: 'center' },
  bottomBar: { x: 0, y: 0, height: 52, color: '#ffeb11' },
  roleBanner: { x: 0, y: 0, fontSize: 30, fontWeight: '900', fontStyle: 'normal', color: '#000000', textAlign: 'center' },
  orderBox: { x: 0, y: 0, fontSize: 22, fontWeight: '800', fontStyle: 'normal', color: '#000000', textAlign: 'center' }
};

const DEFAULT_LAYOUT = {
  ...DEFAULT_PORTRAIT_LAYOUT,
  ...DEFAULT_LANDSCAPE_LAYOUT
};

// Built-in Template Presets (แยกตามกลุ่มรูปแบบ: Portrait vs Landscape)
const BUILTIN_TEMPLATES = {
  // === รูปแบบแนวตั้ง (Styles 1 & 2) ===
  'default_rtaf': {
    name: '🌟 บน.21 มาตรฐาน (Standard)',
    themeGroup: 'portrait',
    layout: { ...DEFAULT_PORTRAIT_LAYOUT }
  },
  'large_photo': {
    name: '🌟 แบบรูปถ่ายขนาดใหญ่ (Large Photo)',
    themeGroup: 'portrait',
    layout: {
      ...DEFAULT_PORTRAIT_LAYOUT,
      photo: { x: 0, y: 0, w: 145, h: 185 },
      logo: { x: 0, y: 0, w: 85, h: 76 },
      orgTitle: { x: 0, y: 0, fontSize: 42, fontWeight: '800', fontStyle: 'normal', color: '#ffffff', textAlign: 'center' },
      rank: { x: 0, y: 0, fontSize: 23, fontWeight: '800', fontStyle: 'normal', color: '#000000', textAlign: 'center' },
      thaiName: { x: 0, y: 0, fontSize: 25, fontWeight: '800', fontStyle: 'normal', color: '#000000', textAlign: 'center' },
      engName: { x: 0, y: 0, fontSize: 17, fontWeight: '700', fontStyle: 'normal', color: '#000000', textAlign: 'center' },
      bottomBlock: { x: 0, y: 0, fontSize: 13.5, fontWeight: '700', fontStyle: 'normal', color: '#000000', textAlign: 'right' },
      stripeOrder: { x: 0, y: 0, fontSize: 58, fontWeight: '800', fontStyle: 'normal', textAlign: 'center' }
    }
  },
  'prominent_rank': {
    name: '🌟 แบบเน้นยศตัวหนาพิเศษ (Bold Rank)',
    themeGroup: 'portrait',
    layout: {
      ...DEFAULT_PORTRAIT_LAYOUT,
      photo: { x: 0, y: 0, w: 120, h: 155 },
      logo: { x: 0, y: 0, w: 90, h: 80 },
      orgTitle: { x: 0, y: 0, fontSize: 44, fontWeight: '800', fontStyle: 'normal', color: '#ffffff', textAlign: 'center' },
      rank: { x: 0, y: 0, fontSize: 26, fontWeight: '800', fontStyle: 'normal', color: '#000000', textAlign: 'center' },
      thaiName: { x: 0, y: 0, fontSize: 28, fontWeight: '800', fontStyle: 'normal', color: '#000000', textAlign: 'center' },
      engName: { x: 0, y: 0, fontSize: 19, fontWeight: '700', fontStyle: 'normal', color: '#000000', textAlign: 'center' },
      bottomBlock: { x: 0, y: 0, fontSize: 14, fontWeight: '700', fontStyle: 'normal', color: '#000000', textAlign: 'right' },
      stripeOrder: { x: 0, y: 0, fontSize: 58, fontWeight: '800', fontStyle: 'normal', textAlign: 'center' }
    }
  },
  'vip_centered': {
    name: '🌟 แบบทางการ (กึ่งกลางทั้งหมด)',
    themeGroup: 'portrait',
    layout: {
      ...DEFAULT_PORTRAIT_LAYOUT,
      photo: { x: 0, y: 0, w: 130, h: 165 },
      logo: { x: 0, y: 0, w: 85, h: 76 },
      orgTitle: { x: 0, y: 0, fontSize: 44, fontWeight: '800', fontStyle: 'normal', color: '#ffffff', textAlign: 'center' },
      rank: { x: 0, y: 0, fontSize: 25, fontWeight: '800', fontStyle: 'normal', color: '#000000', textAlign: 'center' },
      thaiName: { x: 0, y: 0, fontSize: 27, fontWeight: '800', fontStyle: 'normal', color: '#000000', textAlign: 'center' },
      engName: { x: 0, y: 0, fontSize: 18, fontWeight: '700', fontStyle: 'normal', color: '#000000', textAlign: 'center' },
      bottomBlock: { x: 0, y: 0, fontSize: 14.5, fontWeight: '700', fontStyle: 'normal', color: '#000000', textAlign: 'center' },
      stripeOrder: { x: 0, y: 0, fontSize: 58, fontWeight: '800', fontStyle: 'normal', textAlign: 'center' }
    }
  },
  'compact_details': {
    name: '🌟 แบบกะทัดรัด (ข้อมูลครบถ้วน)',
    themeGroup: 'portrait',
    layout: {
      ...DEFAULT_PORTRAIT_LAYOUT,
      photo: { x: 0, y: 0, w: 115, h: 148 },
      logo: { x: 0, y: 0, w: 80, h: 72 },
      orgTitle: { x: 0, y: 0, fontSize: 40, fontWeight: '800', fontStyle: 'normal', color: '#ffffff', textAlign: 'center' },
      rank: { x: 0, y: 0, fontSize: 23, fontWeight: '800', fontStyle: 'normal', color: '#000000', textAlign: 'center' },
      thaiName: { x: 0, y: 0, fontSize: 25, fontWeight: '800', fontStyle: 'normal', color: '#000000', textAlign: 'center' },
      engName: { x: 0, y: 0, fontSize: 17, fontWeight: '700', fontStyle: 'normal', color: '#000000', textAlign: 'center' },
      bottomBlock: { x: 0, y: 0, fontSize: 13, fontWeight: '700', fontStyle: 'normal', color: '#000000', textAlign: 'right' },
      stripeOrder: { x: 0, y: 0, fontSize: 56, fontWeight: '800', fontStyle: 'normal', textAlign: 'center' }
    }
  },
  'international_joint': {
    name: '🌟 แบบสากล / สองภาษา (Inter)',
    themeGroup: 'portrait',
    layout: {
      ...DEFAULT_PORTRAIT_LAYOUT,
      photo: { x: 0, y: 0, w: 125, h: 160 },
      logo: { x: 0, y: 0, w: 85, h: 76 },
      orgTitle: { x: 0, y: 0, fontSize: 42, fontWeight: '800', fontStyle: 'normal', color: '#ffffff', textAlign: 'center' },
      rank: { x: 0, y: 0, fontSize: 22, fontWeight: '700', fontStyle: 'normal', color: '#000000', textAlign: 'center' },
      thaiName: { x: 0, y: 0, fontSize: 24, fontWeight: '700', fontStyle: 'normal', color: '#000000', textAlign: 'center' },
      engName: { x: 0, y: 0, fontSize: 20, fontWeight: '800', fontStyle: 'normal', color: '#000000', textAlign: 'center' },
      bottomBlock: { x: 0, y: 0, fontSize: 13.5, fontWeight: '700', fontStyle: 'normal', color: '#000000', textAlign: 'right' },
      stripeOrder: { x: 0, y: 0, fontSize: 58, fontWeight: '800', fontStyle: 'normal', textAlign: 'center' }
    }
  },

  // === รูปแบบแนวนอน (Style 3) ===
  'landscape_standard': {
    name: '🌟 แนวนอน มาตรฐาน บน.21',
    themeGroup: 'landscape',
    layout: { ...DEFAULT_LANDSCAPE_LAYOUT }
  },
  'landscape_large_photo': {
    name: '🌟 แนวนอน แบบรูปถ่ายขนาดใหญ่',
    themeGroup: 'landscape',
    layout: {
      ...DEFAULT_LANDSCAPE_LAYOUT,
      photo: { x: 0, y: 0, w: 138, h: 165 },
      logo: { x: 0, y: 0, w: 70, h: 70 },
      orgTitle: { x: 0, y: 0, fontSize: 36, fontWeight: '900', fontStyle: 'normal', color: '#000000', textAlign: 'left' },
      thaiName: { x: 0, y: 0, fontSize: 20, fontWeight: '800', fontStyle: 'normal', color: '#000000', textAlign: 'left' },
      workplace: { x: 0, y: 0, fontSize: 20, fontWeight: '800', fontStyle: 'normal', color: '#000000', textAlign: 'left' },
      period: { x: 0, y: 0, fontSize: 20, fontWeight: '800', fontStyle: 'normal', color: '#000000', textAlign: 'left' },
      docNum: { x: 0, y: 0, fontSize: 16, fontWeight: '800', fontStyle: 'normal', color: '#000000', textAlign: 'center' },
      bottomBar: { x: 0, y: 0, height: 52, color: '#ffeb11' },
      roleBanner: { x: 0, y: 0, fontSize: 30, fontWeight: '900', fontStyle: 'normal', color: '#000000', textAlign: 'center' },
      orderBox: { x: 0, y: 0, fontSize: 22, fontWeight: '800', fontStyle: 'normal', color: '#000000', textAlign: 'center' }
    }
  },
  'landscape_prominent_name': {
    name: '🌟 แนวนอน เน้นชื่อตัวหนาพิเศษ',
    themeGroup: 'landscape',
    layout: {
      ...DEFAULT_LANDSCAPE_LAYOUT,
      photo: { x: 0, y: 0, w: 125, h: 155 },
      logo: { x: 0, y: 0, w: 68, h: 68 },
      orgTitle: { x: 0, y: 0, fontSize: 40, fontWeight: '900', fontStyle: 'normal', color: '#000000', textAlign: 'left' },
      thaiName: { x: 0, y: 0, fontSize: 23, fontWeight: '900', fontStyle: 'normal', color: '#000000', textAlign: 'left' },
      workplace: { x: 0, y: 0, fontSize: 20, fontWeight: '800', fontStyle: 'normal', color: '#000000', textAlign: 'left' },
      period: { x: 0, y: 0, fontSize: 20, fontWeight: '800', fontStyle: 'normal', color: '#000000', textAlign: 'left' },
      docNum: { x: 0, y: 0, fontSize: 16, fontWeight: '800', fontStyle: 'normal', color: '#000000', textAlign: 'center' },
      bottomBar: { x: 0, y: 0, height: 54, color: '#ffeb11' },
      roleBanner: { x: 0, y: 0, fontSize: 32, fontWeight: '900', fontStyle: 'normal', color: '#000000', textAlign: 'center' },
      orderBox: { x: 0, y: 0, fontSize: 24, fontWeight: '800', fontStyle: 'normal', color: '#000000', textAlign: 'center' }
    }
  }
};

function getThemeGroup(themeClass) {
  return (themeClass === 'theme-landscape-rtaf') ? 'landscape' : 'portrait';
}

function loadSavedTemplatesRaw() {
  try {
    const saved = localStorage.getItem('user_card_templates');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error loading saved templates:', e);
  }
  return {};
}

function loadSavedTemplates(forTheme) {
  const allTemplates = loadSavedTemplatesRaw();
  const targetGroup = getThemeGroup(forTheme || state.cardTheme || 'theme-navy-red');
  const filtered = {};

  Object.keys(allTemplates).forEach(id => {
    const t = allTemplates[id];
    const group = t.themeGroup || getThemeGroup(t.theme || 'theme-navy-red');
    if (group === targetGroup) {
      filtered[id] = t;
    }
  });

  return filtered;
}

function saveUserTemplate(templateName, layoutData) {
  if (!templateName) return;
  const allTemplates = loadSavedTemplatesRaw();
  const id = 'custom_' + Date.now();
  const curTheme = state.cardTheme || 'theme-navy-red';
  const group = getThemeGroup(curTheme);

  allTemplates[id] = {
    name: templateName,
    theme: curTheme,
    themeGroup: group,
    layout: JSON.parse(JSON.stringify(layoutData))
  };
  localStorage.setItem('user_card_templates', JSON.stringify(allTemplates));
  return id;
}

function deleteUserTemplate(templateId) {
  const allTemplates = loadSavedTemplatesRaw();
  if (allTemplates[templateId]) {
    delete allTemplates[templateId];
    localStorage.setItem('user_card_templates', JSON.stringify(allTemplates));
  }
}

function loadCustomLayout(forTheme) {
  const group = getThemeGroup(forTheme || 'theme-navy-red');
  const storageKey = group === 'landscape' ? 'card_layout_landscape' : 'card_layout_portrait';
  const fallbackDefault = group === 'landscape' ? DEFAULT_LANDSCAPE_LAYOUT : DEFAULT_PORTRAIT_LAYOUT;

  try {
    const saved = localStorage.getItem(storageKey) || localStorage.getItem('card_custom_layout');
    if (saved) {
      const parsed = JSON.parse(saved);
      ['rank', 'thaiName', 'engName', 'bottomBlock'].forEach(k => {
        if (parsed[k] && (parsed[k].color === '#0f172a' || parsed[k].color === '#1e293b' || parsed[k].color === '#334155' || !parsed[k].color || parsed[k].color === '#ffffff' || parsed[k].color === '#fff')) {
          parsed[k].color = '#000000';
        }
      });
      if (parsed.bottomBar && Math.abs(parsed.bottomBar.y || 0) > 40) {
        parsed.bottomBar.y = 0;
      }
      return { ...fallbackDefault, ...parsed };
    }
  } catch (e) {
    console.error('Error loading custom layout:', e);
  }
  return JSON.parse(JSON.stringify(fallbackDefault));
}

// Application State
const state = {
  filePath: localStorage.getItem('last_excel_path') || '',
  fileName: '',
  sheetNames: [],
  currentSheet: '',
  headers: [],
  records: [],
  filteredRecords: [],
  selectedRecord: null,
  selectedRowIndices: new Set(),
  isBatchMode: false,
  pendingImageUpload: null, // { base64, filename, localPath }
  imageCache: new Map(), // In-memory permanent cache: rowIndex -> base64 data URL
  cardBgImage: localStorage.getItem('app_card_bg_image') || '', // Custom background image (base64 data URL)
  isSaving: false,
  headerRowIndex: 0,
  theme: localStorage.getItem('app_theme') || 'dark',
  cardSize: {
    preset: 'standard',
    widthMm: 55,
    heightMm: 85
  },
  customLayout: loadCustomLayout(),
  isVisualEditActive: false,
  selectedLayoutKey: 'photo',
  selectedTemplateId: 'default_rtaf',
  cardTheme: 'theme-navy-red'
};

// Standard Departments Preset (กองบังคับการ, แผนกกำลังพล, การข่าว, ยุทธการ ฯลฯ)
const STANDARD_DEPARTMENTS = [
  'กองบังคับการ (กบค.)',
  'แผนกกำลังพล (ผกพ.)',
  'แผนกการข่าว (ผกข.)',
  'แผนกยุทธการ (ผยก.)',
  'แผนกส่งกำลังบำรุง (ผกบ.)',
  'แผนกการเงิน (ผกง.)',
  'แผนกช่างอากาศ (ผชอ.)',
  'แผนกสื่อสารอิเล็กทรอนิกส์ (ผสอ.)',
  'กองร้อยทหารสารวัตร (ร้อย.สห.)',
  'แผนกพยาบาล / โรงพยาบาล (ผพบ.)',
  'ฝ่ายสนับสนุนทั่วไป (ฝสน.)',
  'แผนกยานพาหนะ (ผยพ.)'
];

// Card Preset Ranks (Air Force, Army, Navy, Police, Civilian)
const RANK_TEMPLATES = [
  // Air Force Ranks (ทหารอากาศ)
  { category: 'ทหารอากาศ (RTAF)', th: 'พล.อ.อ.', en: 'ACM', fullTh: 'พลอากาศเอก', fullEn: 'Air Chief Marshal' },
  { category: 'ทหารอากาศ (RTAF)', th: 'พล.อ.ท.', en: 'AM', fullTh: 'พลอากาศโท', fullEn: 'Air Marshal' },
  { category: 'ทหารอากาศ (RTAF)', th: 'พล.อ.ต.', en: 'AVM', fullTh: 'พลอากาศตรี', fullEn: 'Air Vice Marshal' },
  { category: 'ทหารอากาศ (RTAF)', th: 'น.อ.', en: 'Gp.Capt.', fullTh: 'นาวาอากาศเอก', fullEn: 'Group Captain' },
  { category: 'ทหารอากาศ (RTAF)', th: 'น.ท.', en: 'Wg.Cdr.', fullTh: 'นาวาอากาศโท', fullEn: 'Wing Commander' },
  { category: 'ทหารอากาศ (RTAF)', th: 'น.ต.', en: 'Sqn.Ldr.', fullTh: 'นาวาอากาศตรี', fullEn: 'Squadron Leader' },
  { category: 'ทหารอากาศ (RTAF)', th: 'ร.อ.', en: 'Flt.Lt.', fullTh: 'เรืออากาศเอก', fullEn: 'Flight Lieutenant' },
  { category: 'ทหารอากาศ (RTAF)', th: 'ร.ท.', en: 'Flg.Off.', fullTh: 'เรืออากาศโท', fullEn: 'Flying Officer' },
  { category: 'ทหารอากาศ (RTAF)', th: 'ร.ต.', en: 'Plt.Off.', fullTh: 'เรืออากาศตรี', fullEn: 'Pilot Officer' },
  { category: 'ทหารอากาศ (RTAF)', th: 'พ.อ.อ.', en: 'CMSgt', fullTh: 'พันจ่าอากาศเอก', fullEn: 'Chief Master Sergeant' },
  { category: 'ทหารอากาศ (RTAF)', th: 'พ.อ.ท.', en: 'SMSgt', fullTh: 'พันจ่าอากาศโท', fullEn: 'Senior Master Sergeant' },
  { category: 'ทหารอากาศ (RTAF)', th: 'พ.อ.ต.', en: 'MSgt', fullTh: 'พันจ่าอากาศตรี', fullEn: 'Master Sergeant' },
  { category: 'ทหารอากาศ (RTAF)', th: 'จ.อ.', en: 'TSgt', fullTh: 'จ่าอากาศเอก', fullEn: 'Technical Sergeant' },
  { category: 'ทหารอากาศ (RTAF)', th: 'จ.ท.', en: 'SSgt', fullTh: 'จ่าอากาศโท', fullEn: 'Staff Sergeant' },
  { category: 'ทหารอากาศ (RTAF)', th: 'จ.ต.', en: 'A1C', fullTh: 'จ่าอากาศตรี', fullEn: 'Airman First Class' },
  { category: 'ทหารอากาศ (RTAF)', th: 'พลฯ', en: 'AB', fullTh: 'พลทหาร', fullEn: 'Airman Basic' },

  // Army Ranks (ทหารบก)
  { category: 'ทหารบก (RTA)', th: 'พล.อ.', en: 'Gen.', fullTh: 'พลเอก', fullEn: 'General' },
  { category: 'ทหารบก (RTA)', th: 'พล.ท.', en: 'Lt.Gen.', fullTh: 'พลโท', fullEn: 'Lieutenant General' },
  { category: 'ทหารบก (RTA)', th: 'พล.ต.', en: 'Maj.Gen.', fullTh: 'พลตรี', fullEn: 'Major General' },
  { category: 'ทหารบก (RTA)', th: 'พ.อ.', en: 'Col.', fullTh: 'พันเอก', fullEn: 'Colonel' },
  { category: 'ทหารบก (RTA)', th: 'พ.ท.', en: 'Lt.Col.', fullTh: 'พันโท', fullEn: 'Lieutenant Colonel' },
  { category: 'ทหารบก (RTA)', th: 'พ.ต.', en: 'Maj.', fullTh: 'พันตรี', fullEn: 'Major' },
  { category: 'ทหารบก (RTA)', th: 'ร.อ.', en: 'Capt.', fullTh: 'ร้อยเอก', fullEn: 'Captain' },
  { category: 'ทหารบก (RTA)', th: 'ร.ท.', en: 'Lt.', fullTh: 'ร้อยโท', fullEn: 'Lieutenant' },
  { category: 'ทหารบก (RTA)', th: 'ร.ต.', en: 'Sub.Lt.', fullTh: 'ร้อยตรี', fullEn: 'Sub Lieutenant' },
  { category: 'ทหารบก (RTA)', th: 'จ.ส.อ.', en: 'MSgt.1', fullTh: 'จ่าสิบเอก', fullEn: 'Master Sergeant 1st Class' },
  { category: 'ทหารบก (RTA)', th: 'ส.อ.', en: 'Sgt.', fullTh: 'สิบเอก', fullEn: 'Sergeant' },
  { category: 'ทหารบก (RTA)', th: 'ส.ท.', en: 'Cpl.', fullTh: 'สิบโท', fullEn: 'Corporal' },
  { category: 'ทหารบก (RTA)', th: 'ส.ต.', en: 'L/Cpl.', fullTh: 'สิบตรี', fullEn: 'Lance Corporal' },

  // Navy Ranks (ทหารเรือ)
  { category: 'ทหารเรือ (RTN)', th: 'พล.ร.อ.', en: 'Adm.', fullTh: 'พลเรือเอก', fullEn: 'Admiral' },
  { category: 'ทหารเรือ (RTN)', th: 'พล.ร.ท.', en: 'V.Adm.', fullTh: 'พลเรือโท', fullEn: 'Vice Admiral' },
  { category: 'ทหารเรือ (RTN)', th: 'พล.ร.ต.', en: 'R.Adm.', fullTh: 'พลเรือตรี', fullEn: 'Rear Admiral' },
  { category: 'ทหารเรือ (RTN)', th: 'น.อ.', en: 'Capt.', fullTh: 'นาวาเอก', fullEn: 'Captain' },
  { category: 'ทหารเรือ (RTN)', th: 'น.ท.', en: 'Cdr.', fullTh: 'นาวาโท', fullEn: 'Commander' },
  { category: 'ทหารเรือ (RTN)', th: 'น.ต.', en: 'Lt.Cdr.', fullTh: 'นาวาตรี', fullEn: 'Lieutenant Commander' },
  { category: 'ทหารเรือ (RTN)', th: 'ร.อ.', en: 'Lt.', fullTh: 'เรือเอก', fullEn: 'Lieutenant' },
  { category: 'ทหารเรือ (RTN)', th: 'ร.ท.', en: 'Lt.J.G.', fullTh: 'เรือโท', fullEn: 'Lieutenant Junior Grade' },
  { category: 'ทหารเรือ (RTN)', th: 'ร.ต.', en: 'Sub.Lt.', fullTh: 'เรือตรี', fullEn: 'Sub Lieutenant' },

  // Police Ranks (ตำรวจ)
  { category: 'ตำรวจ (RTP)', th: 'พล.ต.อ.', en: 'Pol.Gen.', fullTh: 'พลตำรวจเอก', fullEn: 'Police General' },
  { category: 'ตำรวจ (RTP)', th: 'พล.ต.ท.', en: 'Pol.Lt.Gen.', fullTh: 'พลตำรวจโท', fullEn: 'Police Lieutenant General' },
  { category: 'ตำรวจ (RTP)', th: 'พล.ต.ต.', en: 'Pol.Maj.Gen.', fullTh: 'พลตำรวจตรี', fullEn: 'Police Major General' },
  { category: 'ตำรวจ (RTP)', th: 'พ.ต.อ.', en: 'Pol.Col.', fullTh: 'พันตำรวจเอก', fullEn: 'Police Colonel' },
  { category: 'ตำรวจ (RTP)', th: 'พ.ต.ท.', en: 'Pol.Lt.Col.', fullTh: 'พันตำรวจโท', fullEn: 'Police Lieutenant Colonel' },
  { category: 'ตำรวจ (RTP)', th: 'พ.ต.ต.', en: 'Pol.Maj.', fullTh: 'พันตำรวจตรี', fullEn: 'Police Major' },
  { category: 'ตำรวจ (RTP)', th: 'ร.ต.อ.', en: 'Pol.Capt.', fullTh: 'ร้อยตำรวจเอก', fullEn: 'Police Captain' },
  { category: 'ตำรวจ (RTP)', th: 'ร.ต.ท.', en: 'Pol.Lt.', fullTh: 'ร้อยตำรวจโท', fullEn: 'Police Lieutenant' },
  { category: 'ตำรวจ (RTP)', th: 'ร.ต.ต.', en: 'Pol.Sub.Lt.', fullTh: 'ร้อยตำรวจตรี', fullEn: 'Police Sub-Lieutenant' },
  { category: 'ตำรวจ (RTP)', th: 'ด.ต.', en: 'SSgt.Maj.', fullTh: 'ดาบตำรวจ', fullEn: 'Senior Sergeant Major' },

  // Civilian (พลเรือน)
  { category: 'พลเรือน (Civilian)', th: 'นาย', en: 'Mr.', fullTh: 'นาย', fullEn: 'Mr.' },
  { category: 'พลเรือน (Civilian)', th: 'นาง', en: 'Mrs.', fullTh: 'นาง', fullEn: 'Mrs.' },
  { category: 'พลเรือน (Civilian)', th: 'นางสาว', en: 'Miss', fullTh: 'นางสาว', fullEn: 'Miss' },
  { category: 'พลเรือน (Civilian)', th: 'Ms.', en: 'Ms.', fullTh: 'Ms.', fullEn: 'Ms.' },
  { category: 'พลเรือน (Civilian)', th: 'ดร.', en: 'Dr.', fullTh: 'ดร.', fullEn: 'Dr.' }
];

// DOM Element References
const elements = {};

function initElements() {
  // Top Header
  elements.excelFileBadge = document.getElementById('excelFileBadge');
  elements.fileStatusDot = document.getElementById('fileStatusDot');
  elements.excelFileNameText = document.getElementById('excelFileNameText');
  elements.sheetSelectWrapper = document.getElementById('sheetSelectWrapper');
  elements.sheetSelect = document.getElementById('sheetSelect');
  elements.btnCreateTemplate = document.getElementById('btnCreateTemplate');
  elements.btnOpenExcel = document.getElementById('btnOpenExcel');
  elements.btnReloadExcel = document.getElementById('btnReloadExcel');
  elements.btnThemeToggle = document.getElementById('btnThemeToggle');
  elements.themeToggleText = document.getElementById('themeToggleText');

  // Sidebar
  elements.btnAddRecord = document.getElementById('btnAddRecord');
  elements.searchInput = document.getElementById('searchInput');
  elements.recordsBadge = document.getElementById('recordsBadge');
  elements.recordsList = document.getElementById('recordsList');
  elements.sidebarSelectAllBar = document.getElementById('sidebarSelectAllBar');
  elements.chkSelectAllRecords = document.getElementById('chkSelectAllRecords');
  elements.selectedCountBadge = document.getElementById('selectedCountBadge');
  elements.btnClearSelection = document.getElementById('btnClearSelection');

  // Tabs & Action Buttons
  elements.tabEditor = document.getElementById('tabEditor');
  elements.tabPreview = document.getElementById('tabPreview');
  elements.editorPanel = document.getElementById('editorPanel');
  elements.previewPanel = document.getElementById('previewPanel');
  elements.btnSaveData = document.getElementById('btnSaveData');
  elements.btnExportPDF = document.getElementById('btnExportPDF');
  elements.btnExportPNG = document.getElementById('btnExportPNG');

  // Card Size Toolbar
  elements.cardSizePreset = document.getElementById('cardSizePreset');
  elements.customDimensionsWrapper = document.getElementById('customDimensionsWrapper');
  elements.customWidthInput = document.getElementById('customWidthInput');
  elements.customHeightInput = document.getElementById('customHeightInput');
  elements.cardDimensionsBadge = document.getElementById('cardDimensionsBadge');

  // Editor Form Container
  elements.editorContainer = document.getElementById('editorContainer');

  // Live Preview Elements
  elements.printableArea = document.getElementById('printableArea');
  elements.cardCustomBgLayer = document.getElementById('cardCustomBgLayer');
  elements.cardLogoText = document.getElementById('cardLogoText');
  elements.cardOrgTitle = document.getElementById('cardOrgTitle');
  elements.cardRank = document.getElementById('cardRank');
  elements.cardThaiFullName = document.getElementById('cardThaiFullName');
  elements.cardEngFullName = document.getElementById('cardEngFullName');
  elements.cardDeptLine = document.getElementById('cardDeptLine');
  elements.cardDeptVal = document.getElementById('cardDeptVal');
  elements.cardWorkplaceLine = document.getElementById('cardWorkplaceLine');
  elements.cardWorkplaceVal = document.getElementById('cardWorkplaceVal');
  elements.cardValidPeriodLine = document.getElementById('cardValidPeriodLine');
  elements.cardValidPeriodVal = document.getElementById('cardValidPeriodVal');
  elements.cardExpiryLine = document.getElementById('cardExpiryLine');
  elements.cardExpiryVal = document.getElementById('cardExpiryVal');
  elements.cardNoteLine = document.getElementById('cardNoteLine');
  elements.cardNoteVal = document.getElementById('cardNoteVal');
  elements.cardExtraFields = document.getElementById('cardExtraFields');
  elements.docImagePreview = document.getElementById('docImagePreview');
  elements.docImagePlaceholder = document.getElementById('docImagePlaceholder');
  elements.cardAvatarFrame = document.getElementById('cardAvatarFrame');
  elements.photoResizeHandle = document.getElementById('photoResizeHandle');
  elements.logoResizeHandle = document.getElementById('logoResizeHandle');
  elements.cardStripeOrderBadge = document.getElementById('cardStripeOrderBadge');
  elements.cardStripeOrderNum = document.getElementById('cardStripeOrderNum');

  // Template & Card Theme Manager Elements
  elements.cardDesignThemeSelect = document.getElementById('cardDesignThemeSelect');
  elements.templatePresetSelect = document.getElementById('templatePresetSelect');
  elements.optgroupBuiltinTemplates = document.getElementById('optgroupBuiltinTemplates');
  elements.optgroupUserTemplates = document.getElementById('optgroupUserTemplates');
  elements.btnSaveTemplate = document.getElementById('btnSaveTemplate');
  elements.btnDeleteTemplate = document.getElementById('btnDeleteTemplate');
  elements.saveTemplateModal = document.getElementById('saveTemplateModal');
  elements.templateNameInput = document.getElementById('templateNameInput');
  elements.btnCloseSaveTemplateModal = document.getElementById('btnCloseSaveTemplateModal');
  elements.btnCancelSaveTemplate = document.getElementById('btnCancelSaveTemplate');
  elements.btnConfirmSaveTemplate = document.getElementById('btnConfirmSaveTemplate');

  // Landscape Elements
  elements.cardLandscapeLayout = document.getElementById('cardLandscapeLayout');
  elements.cardLandscapeOrgTitle = document.getElementById('cardLandscapeOrgTitle');
  elements.cardLandscapeFullName = document.getElementById('cardLandscapeFullName');
  elements.cardLandscapeWorkplace = document.getElementById('cardLandscapeWorkplace');
  elements.cardLandscapePeriod = document.getElementById('cardLandscapePeriod');
  elements.cardLandscapeDocNumVal = document.getElementById('cardLandscapeDocNumVal');
  elements.cardLandscapeRoleBanner = document.getElementById('cardLandscapeRoleBanner');
  elements.cardLandscapeOrderVal = document.getElementById('cardLandscapeOrderVal');
  elements.docLandscapeImagePreview = document.getElementById('docLandscapeImagePreview');
  elements.docLandscapeImagePlaceholder = document.getElementById('docLandscapeImagePlaceholder');

  // Visual Edit Toolbar & Inspector
  elements.btnToggleVisualEdit = document.getElementById('btnToggleVisualEdit');
  elements.btnResetLayout = document.getElementById('btnResetLayout');
  elements.visualEditText = document.getElementById('visualEditText');
  elements.visualEditInspector = document.getElementById('visualEditInspector');
  elements.selectedElementLabel = document.getElementById('selectedElementLabel');
  elements.inspectorPhotoSizeGroup = document.getElementById('inspectorPhotoSizeGroup');
  elements.inspectorLogoSizeGroup = document.getElementById('inspectorLogoSizeGroup');
  elements.inspectorFontSizeGroup = document.getElementById('inspectorFontSizeGroup');
  elements.photoWidthSlider = document.getElementById('photoWidthSlider');
  elements.photoWidthVal = document.getElementById('photoWidthVal');
  elements.photoHeightSlider = document.getElementById('photoHeightSlider');
  elements.photoHeightVal = document.getElementById('photoHeightVal');
  elements.logoWidthSlider = document.getElementById('logoWidthSlider');
  elements.logoWidthVal = document.getElementById('logoWidthVal');
  elements.logoHeightSlider = document.getElementById('logoHeightSlider');
  elements.logoHeightVal = document.getElementById('logoHeightVal');
  elements.fontSizeVal = document.getElementById('fontSizeVal');
  elements.btnFontSizeDec = document.getElementById('btnFontSizeDec');
  elements.btnFontSizeInc = document.getElementById('btnFontSizeInc');
  elements.btnFontWeightToggle = document.getElementById('btnFontWeightToggle');
  elements.btnFontStyleToggle = document.getElementById('btnFontStyleToggle');
  elements.textColorPicker = document.getElementById('textColorPicker');
  elements.btnAlignLeft = document.getElementById('btnAlignLeft');
  elements.btnAlignCenter = document.getElementById('btnAlignCenter');
  elements.btnAlignRight = document.getElementById('btnAlignRight');
  elements.btnCenterElement = document.getElementById('btnCenterElement');

  // Toasts
  elements.toastContainer = document.getElementById('toastContainer');
}

// Theme Management (Light / Dark Mode)
function applyTheme(theme) {
  state.theme = theme === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', state.theme);
  localStorage.setItem('app_theme', state.theme);
  if (elements.themeToggleText) {
    elements.themeToggleText.textContent = state.theme === 'dark' ? 'โหมดสว่าง' : 'โหมดมืด';
  }
}

function toggleTheme() {
  const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  showToast(`เปลี่ยนเป็น ${nextTheme === 'dark' ? '🌙 โหมดมืด (Dark Mode)' : '☀️ โหมดสว่าง (Light Mode)'}`, 'info');
}

// Function to dynamically show/hide form inputs based on active theme
function updateFormFieldsByTheme(theme) {
  const isLandscape = (theme === 'theme-landscape-rtaf');

  const fgRankTh = document.getElementById('formGroupRankTh');
  const fgNameTh = document.getElementById('formGroupNameTh');
  const fgRankEn = document.getElementById('formGroupRankEn');
  const fgNameEn = document.getElementById('formGroupNameEn');

  const fgStripe = document.getElementById('formGroupStripe');
  const fgDept = document.getElementById('formGroupDept');
  const fgNote = document.getElementById('formGroupNote');
  const fgWorkplace = document.getElementById('formGroupWorkplace');
  const fgStartDate = document.getElementById('formGroupStartDate');
  const fgExpiry = document.getElementById('formGroupExpiry');
  const fgDocNum = document.getElementById('formGroupDocNum');
  const fgRoleBanner = document.getElementById('formGroupRoleBanner');
  const fgOrderBox = document.getElementById('formGroupOrderBox');

  if (fgRankTh) fgRankTh.style.display = isLandscape ? 'none' : 'block';
  if (fgNameTh) fgNameTh.style.gridColumn = isLandscape ? '1 / -1' : '';
  if (fgRankEn) fgRankEn.style.display = isLandscape ? 'none' : 'block';
  if (fgNameEn) fgNameEn.style.display = isLandscape ? 'none' : 'block';

  if (fgStripe) fgStripe.style.display = isLandscape ? 'none' : 'block';
  if (fgDept) fgDept.style.display = isLandscape ? 'none' : 'block';
  if (fgNote) fgNote.style.display = isLandscape ? 'none' : 'block';
  if (fgWorkplace) fgWorkplace.style.display = isLandscape ? 'block' : 'none';
  if (fgStartDate) fgStartDate.style.display = isLandscape ? 'block' : 'none';
  if (fgExpiry) fgExpiry.style.display = 'block';
  if (fgDocNum) fgDocNum.style.display = isLandscape ? 'block' : 'none';
  if (fgRoleBanner) fgRoleBanner.style.display = isLandscape ? 'block' : 'none';
  if (fgOrderBox) fgOrderBox.style.display = isLandscape ? 'block' : 'none';
}

// Card Design Theme Management (สไตล์รูปแบบบัตร: 2 แนวตั้ง + 1 แนวนอน)
function setCardTheme(themeClass, syncToRecord = true) {
  const prevTheme = state.cardTheme;
  const prevGroup = getThemeGroup(prevTheme);
  const nextTheme = themeClass || 'theme-navy-red';
  const nextGroup = getThemeGroup(nextTheme);

  // If switching theme group (portrait <-> landscape), save previous group layout and load target group layout
  if (prevTheme && prevGroup !== nextGroup) {
    const prevKey = prevGroup === 'landscape' ? 'card_layout_landscape' : 'card_layout_portrait';
    try {
      localStorage.setItem(prevKey, JSON.stringify(state.customLayout));
    } catch (e) {}

    state.cardTheme = nextTheme;
    state.customLayout = loadCustomLayout(nextTheme);
    state.selectedTemplateId = nextGroup === 'landscape' ? 'landscape_standard' : 'default_rtaf';
    saveCustomLayout();
  } else {
    state.cardTheme = nextTheme;
  }

  if (elements.cardDesignThemeSelect) {
    elements.cardDesignThemeSelect.value = state.cardTheme;
  }
  const selCardTheme = document.getElementById('templateCardThemeSelect');
  if (selCardTheme) {
    selCardTheme.value = state.cardTheme;
  }
  if (elements.printableArea) {
    elements.printableArea.classList.remove('theme-navy-red', 'theme-gold-executive', 'theme-landscape-rtaf', 'theme-security-tactical', 'theme-staff-teal', 'theme-access-pass');
    elements.printableArea.classList.add(state.cardTheme);
  }

  // Dynamically update form inputs visibility for this theme
  updateFormFieldsByTheme(state.cardTheme);

  // Auto-adjust dimensions for landscape vs portrait
  applyCardDimensionsUI();

  // Re-render template dropdown for the new card theme
  renderTemplateDropdown();

  applyCustomLayoutToDOM();

  if (syncToRecord && state.selectedRecord) {
    state.selectedRecord['รูปแบบบัตร'] = state.cardTheme;
    const currentIdx = state.records.findIndex(r => r._rowIndex === state.selectedRecord._rowIndex);
    if (currentIdx !== -1) {
      state.records[currentIdx]['รูปแบบบัตร'] = state.cardTheme;
    }
    if (elements.btnSaveData) elements.btnSaveData.disabled = false;
  }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  try {
    initElements();
    applyTheme(state.theme);
    setupEventListeners();
    initVisualEditEngine();
    initThaiCalendar();
    applyCardDimensionsUI();

    // Check last used Excel file path
    const savedPath = localStorage.getItem('last_excel_path');
    if (savedPath && window.electronAPI && window.electronAPI.readExcelFile) {
      loadExcelFile(savedPath);
    } else {
      updateFileStatusUI('disconnected', 'ยังไม่ได้เลือกไฟล์ Excel');
      renderEmptyEditor();
    }
  } catch (err) {
    console.error('Initialization error:', err);
    renderEmptyEditor();
  }
});

// Event Listeners Setup
function setupEventListeners() {
  // Theme Toggle
  if (elements.btnThemeToggle) elements.btnThemeToggle.addEventListener('click', toggleTheme);

  // Card Design Style Theme Switcher
  if (elements.cardDesignThemeSelect) {
    elements.cardDesignThemeSelect.addEventListener('change', (e) => {
      setCardTheme(e.target.value, true);
      renderLivePreview();
      showToast(`เปลี่ยนสไตล์บัตรเป็น: ${elements.cardDesignThemeSelect.options[elements.cardDesignThemeSelect.selectedIndex].text}`, 'info');
    });
  }

  // Excel File Actions
  if (elements.btnCreateTemplate) elements.btnCreateTemplate.addEventListener('click', handleCreateExcelTemplate);
  if (elements.btnOpenExcel) elements.btnOpenExcel.addEventListener('click', handleOpenExcelDialog);
  if (elements.btnReloadExcel) elements.btnReloadExcel.addEventListener('click', () => {
    if (state.filePath) loadExcelFile(state.filePath, state.currentSheet);
  });
  if (elements.btnAddRecord) elements.btnAddRecord.addEventListener('click', addNewRecord);
  if (elements.sheetSelect) elements.sheetSelect.addEventListener('change', handleSheetChange);

  // Search & Batch Select
  if (elements.searchInput) elements.searchInput.addEventListener('input', handleSearch);
  if (elements.chkSelectAllRecords) {
    elements.chkSelectAllRecords.addEventListener('change', (e) => {
      selectAllRecords(e.target.checked);
    });
  }
  if (elements.btnClearSelection) {
    elements.btnClearSelection.addEventListener('click', clearRecordSelection);
  }

  // Tab switching
  if (elements.tabEditor) elements.tabEditor.addEventListener('click', () => switchTab('editorPanel'));
  if (elements.tabPreview) elements.tabPreview.addEventListener('click', () => switchTab('previewPanel'));

  // Card Size Toolbar
  if (elements.cardSizePreset) elements.cardSizePreset.addEventListener('change', handleCardSizeChange);
  if (elements.customWidthInput) elements.customWidthInput.addEventListener('input', handleCustomDimensionsChange);
  if (elements.customHeightInput) elements.customHeightInput.addEventListener('input', handleCustomDimensionsChange);

  // Actions
  if (elements.btnSaveData) elements.btnSaveData.addEventListener('click', saveDataToExcel);
  if (elements.btnExportPDF) elements.btnExportPDF.addEventListener('click', exportToPDF);
  if (elements.btnExportPNG) elements.btnExportPNG.addEventListener('click', exportToPNG);
}

// Create Excel Template File
async function handleCreateExcelTemplate() {
  if (window.electronAPI && window.electronAPI.createExcelTemplate) {
    const result = await window.electronAPI.createExcelTemplate();
    if (result.success && result.filePath) {
      showToast('สร้างไฟล์ Excel แม่แบบสำเร็จ!', 'success');
      await loadExcelFile(result.filePath);
    }
  } else {
    // Web Fallback: Generate and download standard Excel template
    const XLSXLib = window.XLSX || (typeof XLSX !== 'undefined' ? XLSX : null);
    if (!XLSXLib) {
      showToast('ไม่พบโมดูล XLSX สำหรับสร้างไฟล์แม่แบบ', 'error');
      return;
    }
    const headers = ['ลำดับ', 'ยศ', 'ชื่อ-นามสกุล', 'ยศ (อังกฤษ)', 'ชื่อ-นามสกุล (อังกฤษ)', 'แผนก', 'วันหมดอายุ', 'หมายเหตุ', 'รูปถ่าย'];
    const sampleRows = [
      headers,
      ['1', 'น.อ.', 'สมชาย ใจดี', 'Gp.Capt.', 'Somchai Jaidee', 'กองบังคับการ', '31 ธ.ค. 2570', 'ตัวอย่างข้อมูล', 'sample_photo.png'],
      ['2', 'น.ท.', 'วิชัย รักชาติ', 'Wg.Cdr.', 'Wichai Rakchat', 'แผนกการข่าว', '31 ธ.ค. 2570', '', '']
    ];
    const workbook = XLSXLib.utils.book_new();
    const worksheet = XLSXLib.utils.aoa_to_sheet(sampleRows);
    XLSXLib.utils.book_append_sheet(workbook, worksheet, 'รายชื่อบุคลากร');
    XLSXLib.writeFile(workbook, `ตารางข้อมูลบัตรประจำตัว_แม่แบบ_${Date.now()}.xlsx`);
    showToast('สร้างและดาวน์โหลดไฟล์ Excel แม่แบบสำเร็จ!', 'success');
  }
}

// Add New Record
function addNewRecord() {
  if (!state.headers || state.headers.length === 0) {
    state.headers = ['ลำดับ', 'ยศ', 'ชื่อ-นามสกุล', 'ยศ (อังกฤษ)', 'ชื่อ-นามสกุล (อังกฤษ)', 'แผนก', 'วันหมดอายุ', 'หมายเหตุ', 'รูปถ่าย'];
  }
  ensureEssentialHeaders();

  const maxRowIndex = state.records.reduce((max, r) => Math.max(max, r._rowIndex || 0), 0);
  const newRowIndex = maxRowIndex > 0 ? maxRowIndex + 1 : (state.headerRowIndex ? state.headerRowIndex + 2 : 2);

  const { rankHeader, thaiNameHeader, engRankHeader, engNameHeader, deptHeader, expiryHeader, noteHeader, stripeHeader } = getRankAndNameHeaders();

  const defaultYearTh = new Date().getFullYear() + 543 + 1;

  const newRec = { _rowIndex: newRowIndex };
  state.headers.forEach(h => {
    newRec[h] = '';
  });

  if (state.headers.includes('ลำดับ')) {
    newRec['ลำดับ'] = String(state.records.length + 1);
  }
  const targetStripeKey = stripeHeader || 'แถบสี';
  newRec[targetStripeKey] = '1';

  if (rankHeader) newRec[rankHeader] = 'นาย';
  if (thaiNameHeader) newRec[thaiNameHeader] = 'บุคลากรใหม่';
  if (engRankHeader) newRec[engRankHeader] = 'Mr.';
  if (engNameHeader) newRec[engNameHeader] = 'New Person';
  newRec[deptHeader || 'แผนก'] = 'กองบังคับการ';
  newRec[expiryHeader || 'วันหมดอายุ'] = `31 ธ.ค. ${defaultYearTh}`;
  newRec[noteHeader || 'หมายเหตุ'] = '';

  state.records.push(newRec);
  state.filteredRecords = [...state.records];
  elements.recordsBadge.textContent = state.records.length;

  selectRecord(newRec);
  showToast(`เพิ่มรายชื่อใหม่แล้ว (แถวที่ ${newRowIndex})`, 'success');
}

// Duplicate Selected Record
function duplicateRecord() {
  if (!state.selectedRecord) return;
  const current = state.selectedRecord;

  const maxRowIndex = state.records.reduce((max, r) => Math.max(max, r._rowIndex || 0), 0);
  const newRowIndex = maxRowIndex + 1;

  const newRec = { ...current, _rowIndex: newRowIndex };

  // Copy cached image if exists
  const currentImg = current._imageBase64 || (state.imageCache && state.imageCache.get(current._rowIndex));
  if (currentImg) {
    newRec._imageBase64 = currentImg;
    if (!state.imageCache) state.imageCache = new Map();
    state.imageCache.set(newRowIndex, currentImg);
  }

  const { thaiNameHeader, engNameHeader, stripeHeader } = getRankAndNameHeaders();
  if (thaiNameHeader && newRec[thaiNameHeader]) {
    newRec[thaiNameHeader] = `${newRec[thaiNameHeader]} (สำเนา)`;
  }
  if (engNameHeader && newRec[engNameHeader]) {
    newRec[engNameHeader] = `${newRec[engNameHeader]} (Copy)`;
  }

  if (state.headers.includes('ลำดับ')) {
    newRec['ลำดับ'] = String(state.records.length + 1);
  }

  // Preserve 1 or 2 stripe badge choice
  const targetStripeKey = stripeHeader || 'แถบสี';
  newRec[targetStripeKey] = current[targetStripeKey] === '2' ? '2' : '1';

  state.records.push(newRec);
  state.filteredRecords = [...state.records];
  elements.recordsBadge.textContent = state.records.length;

  selectRecord(newRec);
  showToast(`คัดลอกข้อมูลสำเร็จ (แถวใหม่ที่ ${newRowIndex})`, 'success');
}

// Delete Selected Record
function deleteRecord() {
  if (!state.selectedRecord) return;
  const targetIndex = state.records.findIndex(r => r._rowIndex === state.selectedRecord._rowIndex);
  if (targetIndex === -1) return;

  const confirmDelete = confirm(`คุณต้องการลบรายชื่อแถวที่ ${state.selectedRecord._rowIndex} ใช่หรือไม่?`);
  if (!confirmDelete) return;

  if (state.imageCache) {
    state.imageCache.delete(state.selectedRecord._rowIndex);
  }

  state.records.splice(targetIndex, 1);
  state.filteredRecords = [...state.records];
  elements.recordsBadge.textContent = state.records.length;

  if (state.records.length > 0) {
    const nextIndex = Math.min(targetIndex, state.records.length - 1);
    selectRecord(state.records[nextIndex]);
  } else {
    state.selectedRecord = null;
    renderSidebarList();
    renderEmptyEditor();
  }

  elements.btnSaveData.disabled = false;
  showToast('ลบรายการเรียบร้อยแล้ว', 'info');
}

// Helper: Render Department Dropdown Options (Standard 10+ Departments + Excel departments)
function renderDeptSelectOptions(currentVal = '') {
  let html = `<option value="">-- เลือกแผนกมาตรฐาน (10+ แผนก) --</option>`;
  const { deptHeader } = getRankAndNameHeaders();
  const key = deptHeader || 'แผนก';
  const fileDepts = [...new Set(state.records.map(r => r[key]).filter(Boolean))];
  const allDepts = [...new Set([...STANDARD_DEPARTMENTS, ...fileDepts])];

  allDepts.forEach(d => {
    const selected = currentVal && (currentVal.trim() === String(d).trim()) ? 'selected' : '';
    html += `<option value="${escapeHTML(String(d))}" ${selected}>${escapeHTML(String(d))}</option>`;
  });
  return html;
}

// Helper: Render Department Suggestions Datalist
function renderDeptSuggestionsHTML() {
  const { deptHeader } = getRankAndNameHeaders();
  const key = deptHeader || 'แผนก';
  const fileDepts = [...new Set(state.records.map(r => r[key]).filter(Boolean))];
  const allDepts = [...new Set([...STANDARD_DEPARTMENTS, ...fileDepts])];
  return allDepts.map(d => `<option value="${escapeHTML(String(d))}"></option>`).join('');
}

// Open File Dialog (Supports both Electron IPC and Web Browser File Input)
async function handleOpenExcelDialog() {
  if (state.isOpeningDialog) return;
  state.isOpeningDialog = true;

  try {
    if (window.electronAPI && window.electronAPI.openExcelDialog) {
      const result = await window.electronAPI.openExcelDialog();
      if (result && result.success && result.filePath) {
        await loadExcelFile(result.filePath);
      }
    } else {
      // Web Fallback: Use HTML5 File Input
      let inputElem = document.getElementById('webExcelFileInput');
      if (!inputElem) {
        inputElem = document.createElement('input');
        inputElem.type = 'file';
        inputElem.id = 'webExcelFileInput';
        inputElem.accept = '.xlsx, .xls, .csv';
        inputElem.style.display = 'none';
        document.body.appendChild(inputElem);
      }
      inputElem.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
          await loadExcelFileFromBuffer(file);
        }
      };
      inputElem.click();
    }
  } finally {
    setTimeout(() => {
      state.isOpeningDialog = false;
    }, 400);
  }
}

// Web Fallback: Read Excel File from File Object (using bundled XLSX library)
async function loadExcelFileFromBuffer(file) {
  try {
    updateFileStatusUI('connecting', 'กำลังอ่านไฟล์ Excel...');
    showToast('กำลังอ่านข้อมูลจากไฟล์...', 'info');

    const arrayBuffer = await file.arrayBuffer();
    const XLSXLib = window.XLSX || (typeof XLSX !== 'undefined' ? XLSX : null);
    if (!XLSXLib) {
      throw new Error('ไม่พบโมดูล XLSX');
    }

    const workbook = XLSXLib.read(arrayBuffer, { type: 'array', cellDates: true });
    const sheetNames = workbook.SheetNames;
    if (!sheetNames || sheetNames.length === 0) {
      throw new Error('ไฟล์ Excel ไม่มีแผ่นงาน');
    }

    const currentSheet = sheetNames[0];
    const worksheet = workbook.Sheets[currentSheet];
    const rawRows = XLSXLib.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

    if (!rawRows || rawRows.length === 0) {
      throw new Error('ไม่มีข้อมูลในแผ่นงาน');
    }

    const maxScanRows = Math.min(rawRows.length, 10);
    let headerRowIndex = 0;
    let maxNonEmptyCols = 0;

    for (let i = 0; i < maxScanRows; i++) {
      const row = rawRows[i];
      if (!Array.isArray(row)) continue;
      const nonEmptyCount = row.filter(cell => String(cell || '').trim().length > 0).length;
      if (nonEmptyCount > maxNonEmptyCols) {
        maxNonEmptyCols = nonEmptyCount;
        headerRowIndex = i;
      }
    }

    let headers = rawRows[headerRowIndex].map(h => String(h || '').trim()).filter(h => h.length > 0);
    const rows = [];

    for (let i = headerRowIndex + 1; i < rawRows.length; i++) {
      const rawRow = rawRows[i];
      if (!Array.isArray(rawRow)) continue;
      if (!rawRow.some(cell => String(cell || '').trim().length > 0)) continue;

      const rowObj = { _rowIndex: i + 1 };
      headers.forEach((h, colIdx) => {
        rowObj[h] = colIdx < rawRow.length ? rawRow[colIdx] : '';
      });
      rows.push(rowObj);
    }

    state.filePath = file.name;
    state.fileName = file.name;
    state.sheetNames = sheetNames;
    state.currentSheet = currentSheet;
    state.headers = headers;
    state.headerRowIndex = headerRowIndex;
    state.records = rows;

    ensureEssentialHeaders();

    state.filteredRecords = [...state.records];
    state.selectedRecord = null;
    state.pendingImageUpload = null;

    elements.btnReloadExcel.disabled = false;
    elements.recordsBadge.textContent = state.records.length;
    updateFileStatusUI('connected', `${state.fileName} (${state.records.length} รายการ)`);

    renderSheetSelector();
    renderSidebarList();

    if (state.records.length > 0) {
      selectRecord(state.records[0]);
    } else {
      renderEmptyEditor();
    }

    showToast(`โหลดสำเร็จ: ${state.fileName} (${state.records.length} รายการ)`, 'success');
  } catch (err) {
    console.error(err);
    updateFileStatusUI('disconnected', 'อ่านไฟล์ Excel ล้มเหลว');
    showToast(`เกิดข้อผิดพลาด: ${err.message}`, 'error');
  }
}

// Helper: Convert Rank to Full Thai Rank Name (including female suffix variants)
function getFullRankTh(rankStr, nameStr = '') {
  if (!rankStr) return '';
  let str = String(rankStr).trim();
  if (!str) return '';

  let hasFemaleSuffix = false;
  if (str.includes('หญิง') || str.includes('(ญ.)') || str.includes('(ญ)') || str.endsWith('ญ.')) {
    hasFemaleSuffix = true;
    str = str.replace(/หญิง|\(ญ\.?\)|\(ญ\)|ญ\./g, '').trim();
  }

  if (!hasFemaleSuffix && nameStr && String(nameStr).trim().startsWith('หญิง ')) {
    hasFemaleSuffix = true;
  }

  let match = RANK_TEMPLATES.find(t => t.th === str || t.fullTh === str || str.startsWith(t.th) || str.startsWith(t.fullTh));
  if (!match) {
    const cleanStr = str.replace(/\./g, '');
    match = RANK_TEMPLATES.find(t => t.th.replace(/\./g, '') === cleanStr || t.fullTh.replace(/\./g, '') === cleanStr);
  }

  let fullRank = match ? match.fullTh : str;

  if (hasFemaleSuffix && !fullRank.endsWith('หญิง') && !['นาย', 'นาง', 'นางสาว', 'Ms.', 'Mr.', 'Mrs.', 'Dr.', 'ดร.'].includes(fullRank)) {
    fullRank += 'หญิง';
  }

  return fullRank;
}

// Helper: Smart Rank & Name Parser
function parseRankAndName(fullString, isEng = false) {
  if (!fullString) return { rank: '', name: '' };
  let str = String(fullString).trim();
  if (!str) return { rank: '', name: '' };

  const sorted = [...RANK_TEMPLATES].sort((a, b) => {
    const keyA = isEng ? a.en : (a.fullTh || a.th);
    const keyB = isEng ? b.en : (b.fullTh || b.th);
    return keyB.length - keyA.length;
  });

  for (const item of sorted) {
    if (isEng) {
      const candidates = [item.en, item.fullEn];
      if (item.en === 'Flg.Off.' || item.en === 'Fg.Off.') candidates.push('Flg.Off.', 'Fg.Off.', 'Flg.Off', 'Fg.Off', 'Flg. Off.', 'Fg. Off.');
      if (item.en === 'Wg.Cdr.') candidates.push('Wg.Cdr.', 'Wg.Cdr', 'Wing Cdr.', 'Wing Cdr');
      if (item.en === 'Gp.Capt.') candidates.push('Gp.Capt.', 'Gp.Capt', 'Group Capt.', 'Group Capt');
      if (item.en === 'Flt.Lt.') candidates.push('Flt.Lt.', 'Flt.Lt', 'Flight Lt.', 'Flt Lt.');
      if (item.en === 'Sqn.Ldr.') candidates.push('Sqn.Ldr.', 'Sqn.Ldr', 'Squadron Ldr.', 'Sqn Ldr.');
      if (item.en === 'Plt.Off.') candidates.push('Plt.Off.', 'Plt.Off', 'Pilot Off.', 'Plt Off.');

      for (const k of candidates) {
        if (!k) continue;
        if (str.toLowerCase().startsWith(k.toLowerCase())) {
          let namePart = str.substring(k.length).trim().replace(/^\./, '').trim();
          return { rank: item.en, name: namePart };
        }
      }
    } else {
      const fullKey = item.fullTh;
      const rankKey = item.th;

      if (fullKey && (str.startsWith(fullKey + ' ') || str.startsWith(fullKey))) {
        let namePart = str.substring(fullKey.length).trim();
        return { rank: item.fullTh, name: namePart };
      }
      if (rankKey && (str.startsWith(rankKey + ' ') || str.startsWith(rankKey) || (rankKey.endsWith('.') && str.startsWith(rankKey)))) {
        let namePart = str.substring(rankKey.length).trim();
        return { rank: item.fullTh, name: namePart };
      }
    }
  }

  // Fallback for generic patterns
  if (isEng) {
    const matchAbbr = str.match(/^([A-Za-z]+(?:\.[A-Za-z]+)*\.?)\s*(.*)$/);
    if (matchAbbr && matchAbbr[1] && matchAbbr[2] && (matchAbbr[1].includes('.') || ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr'].includes(matchAbbr[1]))) {
      return { rank: matchAbbr[1], name: matchAbbr[2].trim() };
    }
  }

  const parts = str.split(/\s+/);
  if (parts.length > 1 && (parts[0].endsWith('.') || ['นาย', 'นาง', 'นางสาว', 'Mr.', 'Mrs.', 'Miss', 'Ms.', 'Dr.'].includes(parts[0]))) {
    const fullPrefix = isEng ? parts[0] : getFullRankTh(parts[0]);
    return { rank: fullPrefix, name: parts.slice(1).join(' ') };
  }

  return { rank: '', name: str };
}

// Helper: Find Mapped Column Headers
function getRankAndNameHeaders() {
  // 1. English Rank header
  const engRankHeader = state.headers.find(h => {
    const l = String(h).toLowerCase();
    const isEng = l.includes('อังกฤษ') || l.includes('english') || l.includes('eng') || l.includes('en');
    const isRank = l.includes('ยศ') || l.includes('rank') || l.includes('title') || l.includes('prefix');
    return isEng && isRank && !isImageHeader(h) && !isOrderHeader(h);
  });

  // 2. English Name header
  const engNameHeader = state.headers.find(h => {
    const l = String(h).toLowerCase();
    const isEng = l.includes('อังกฤษ') || l.includes('english') || l.includes('eng') || l.includes('en');
    const isName = l.includes('ชื่อ') || l.includes('นามสกุล') || l.includes('name') || l.includes('fullname');
    return (isEng && isName || l === 'name_en' || l === 'en_name' || l === 'english_name' || l === 'eng_name') && h !== engRankHeader && !isImageHeader(h) && !isOrderHeader(h);
  }) || state.headers.find(h => {
    const l = String(h).toLowerCase();
    return (l.includes('อังกฤษ') || l.includes('english') || l.includes('eng')) && h !== engRankHeader && !isImageHeader(h) && !isOrderHeader(h);
  });

  // 3. Thai Rank header
  const rankHeader = state.headers.find(h => {
    const l = String(h).toLowerCase();
    const isRankOnly = (l === 'ยศ' || l.includes('คำนำหน้า') || l.includes('rank') || l.includes('title') || l.includes('prefix'));
    const isCombined = (l.includes('ชื่อ') || l.includes('นามสกุล') || l.includes('name'));
    return isRankOnly && !isCombined && h !== engRankHeader && h !== engNameHeader && !isImageHeader(h) && !isOrderHeader(h);
  });

  // 4. Thai Name header
  const thaiNameHeader = state.headers.find(h => {
    const l = String(h).toLowerCase();
    const isName = l.includes('ชื่อ') || l.includes('นามสกุล') || l.includes('ไทย') || l.includes('name') || l.includes('ผู้');
    return isName && h !== engNameHeader && h !== engRankHeader && h !== rankHeader && !isImageHeader(h) && !isOrderHeader(h);
  });

  const deptHeader = state.headers.find(h => {
    const l = String(h).toLowerCase();
    return (l.includes('แผนก') || l.includes('สังกัด') || l.includes('ฝ่าย') || l.includes('กอง') || l.includes('dept') || l.includes('department')) && !isImageHeader(h) && !isOrderHeader(h);
  });

  const workplaceHeader = state.headers.find(h => {
    const l = String(h).toLowerCase();
    return (l.includes('สถานที่') || l.includes('ที่ทำงาน') || l.includes('duty') || l.includes('workplace') || l.includes('location') || l.includes('site')) && !isImageHeader(h);
  });

  const startDateHeader = state.headers.find(h => {
    const l = String(h).toLowerCase();
    return (l.includes('เริ่ม') || l.includes('start') || l.includes('issue') || l.includes('valid_from')) && !l.includes('หมด') && !isImageHeader(h);
  });

  const expiryHeader = state.headers.find(h => {
    const l = String(h).toLowerCase();
    return (l.includes('หมดอายุ') || l.includes('expiry') || l.includes('expire') || l.includes('exp') || l.includes('valid')) && !isImageHeader(h);
  });

  const noteHeader = state.headers.find(h => {
    const l = String(h).toLowerCase();
    return (l.includes('หมายเหตุ') || l.includes('note') || l.includes('remark') || l.includes('comment')) && !isImageHeader(h);
  });

  const stripeHeader = state.headers.find(h => isStripeHeader(h));
  const orderHeader = state.headers.find(h => isOrderHeader(h));

  return {
    rankHeader,
    thaiNameHeader,
    engRankHeader,
    engNameHeader,
    deptHeader,
    workplaceHeader,
    startDateHeader,
    expiryHeader,
    noteHeader,
    orderHeader,
    stripeHeader
  };
}

function isStripeHeader(header) {
  if (!header) return false;
  const l = String(header).toLowerCase().trim();
  return l === 'แถบสี' || l === 'หมายเลขแถบ' || l === 'หมายเลขแถบสี' || l === 'ประเภทแถบ' || l === 'ประเภทแถบสี' || l === 'stripe_num' || l === 'stripe_order' || l === 'stripe_type' || l === 'badge_type';
}

function isOrderHeader(header) {
  if (!header) return false;
  const l = String(header).toLowerCase().trim();
  return l === 'ลำดับ' || l === 'ลำดับที่' || l === 'no' || l === 'order' || isStripeHeader(header);
}

// Helper: Ensure essential columns exist (ลำดับ, แผนก, วันหมดอายุ, หมายเหตุ)
function ensureEssentialHeaders() {
  const essential = ['ลำดับ', 'แผนก', 'วันหมดอายุ', 'หมายเหตุ'];
  essential.forEach(h => {
    const exists = state.headers.some(ex => {
      const l = ex.toLowerCase();
      if (h === 'ลำดับ') return isOrderHeader(ex);
      if (h === 'แผนก') return l.includes('แผนก') || l.includes('สังกัด') || l.includes('dept');
      if (h === 'วันหมดอายุ') return l.includes('หมดอายุ') || l.includes('expiry') || l.includes('expire');
      if (h === 'หมายเหตุ') return l.includes('หมายเหตุ') || l.includes('note') || l.includes('remark');
      return false;
    });
    if (!exists) {
      state.headers.push(h);
    }
  });

  state.records.forEach(rec => {
    state.headers.forEach(h => {
      if (rec[h] === undefined) {
        rec[h] = h === 'ลำดับ' ? '1' : '';
      }
    });
  });
}

// Helper: Render Rank Dropdown Options Grouped by Category
function renderRankSelectOptions(currentVal = '', isEng = false) {
  let html = `<option value="">-- เลือกระบุยศ (${isEng ? 'English' : 'ไทย'}) --</option>`;
  const categories = [...new Set(RANK_TEMPLATES.map(t => t.category))];

  categories.forEach(cat => {
    html += `<optgroup label="${escapeHTML(cat)}">`;
    const items = RANK_TEMPLATES.filter(t => t.category === cat);
    items.forEach(item => {
      const val = isEng ? item.en : item.fullTh;
      const label = isEng ? `${item.en} (${item.fullEn})` : `${item.fullTh} (${item.th})`;
      let selected = '';
      if (currentVal) {
        const c = currentVal.trim().toLowerCase();
        if (isEng) {
          if (c === item.en.toLowerCase() || c === (item.fullEn && item.fullEn.toLowerCase()) || (item.en === 'Flg.Off.' && c === 'fg.off.')) {
            selected = 'selected';
          }
        } else {
          if (c === item.fullTh.toLowerCase() || c === item.th.toLowerCase()) {
            selected = 'selected';
          }
        }
      }
      html += `<option value="${escapeHTML(val)}" ${selected}>${escapeHTML(label)}</option>`;
    });
    html += `</optgroup>`;
  });

  return html;
}

// Load Excel File Data
async function loadExcelFile(filePath, targetSheet = null) {
  try {
    updateFileStatusUI('connecting', 'กำลังโหลดไฟล์ Excel...');
    showToast('กำลังอ่านข้อมูลจากไฟล์ Excel...', 'info');

    const result = await window.electronAPI.readExcelFile({
      filePath,
      sheetName: targetSheet
    });

    if (!result.success) {
      throw new Error(result.error || 'ไม่สามารถเปิดไฟล์ Excel ได้');
    }

    state.filePath = result.filePath;
    state.fileName = result.fileName;
    state.sheetNames = result.sheetNames || [];
    state.currentSheet = result.currentSheet || (state.sheetNames[0] || 'Sheet1');
    state.headers = result.headers || [];
    state.headerRowIndex = result.headerRowIndex || 0;
    state.records = result.data || [];

    // Ensure essential headers (แผนก, วันหมดอายุ, หมายเหตุ) exist in app
    ensureEssentialHeaders();

    state.filteredRecords = [...state.records];
    state.selectedRecord = null;
    state.selectedRowIndices.clear();
    state.isBatchMode = false;
    state.pendingImageUpload = null;

    localStorage.setItem('last_excel_path', state.filePath);

    // Update UI Elements
    elements.btnReloadExcel.disabled = false;
    elements.recordsBadge.textContent = state.records.length;
    updateFileStatusUI('connected', `${state.fileName} (${state.records.length} รายการ)`);

    // Render Sheet Selector
    renderSheetSelector();

    // Render Records List
    renderSidebarList();

    if (state.records.length > 0) {
      selectRecord(state.records[0]);
    } else {
      renderEmptyEditor();
    }

    showToast(`โหลดสำเร็จ: ${state.fileName} (${state.records.length} รายการ)`, 'success');

  } catch (err) {
    console.error(err);
    updateFileStatusUI('disconnected', 'เปิดไฟล์ Excel ล้มเหลว');
    showToast(`เกิดข้อผิดพลาด: ${err.message}`, 'error');
  }
}

// Sheet Switcher
async function handleSheetChange(e) {
  const newSheet = e.target.value;
  if (newSheet && newSheet !== state.currentSheet) {
    await loadExcelFile(state.filePath, newSheet);
  }
}

function renderSheetSelector() {
  if (state.sheetNames.length > 1) {
    elements.sheetSelectWrapper.style.display = 'flex';
    elements.sheetSelect.innerHTML = state.sheetNames.map(name => `
      <option value="${escapeHTML(name)}" ${name === state.currentSheet ? 'selected' : ''}>${escapeHTML(name)}</option>
    `).join('');
  } else {
    elements.sheetSelectWrapper.style.display = 'none';
  }
}

function updateFileStatusUI(status, message) {
  if (status === 'connected') {
    elements.fileStatusDot.className = 'status-dot connected';
    elements.excelFileNameText.textContent = message || 'เชื่อมต่อไฟล์ Excel สำเร็จ';
    elements.excelFileBadge.style.borderColor = 'rgba(16, 185, 129, 0.4)';
  } else if (status === 'connecting') {
    elements.fileStatusDot.className = 'status-dot connecting';
    elements.excelFileNameText.textContent = message || 'กำลังโหลด...';
    elements.excelFileBadge.style.borderColor = 'rgba(245, 158, 11, 0.4)';
  } else {
    elements.fileStatusDot.className = 'status-dot disconnected';
    elements.excelFileNameText.textContent = message || 'ยังไม่ได้เลือกไฟล์ Excel';
    elements.excelFileBadge.style.borderColor = 'rgba(239, 68, 68, 0.4)';
  }
}

// Save Records to Excel File
async function saveDataToExcel() {
  if (state.records.length === 0) {
    showToast('ไม่มีข้อมูลสำหรับบันทึก', 'info');
    return;
  }

  // Sync currently edited record
  if (state.selectedRecord) {
    const idx = state.records.findIndex(r => r._rowIndex === state.selectedRecord._rowIndex);
    if (idx !== -1) {
      state.records[idx] = { ...state.selectedRecord };
    }
  }

  try {
    state.isSaving = true;
    if (elements.btnSaveData) elements.btnSaveData.disabled = true;
    showToast('กำลังบันทึกข้อมูลลงไฟล์ Excel...', 'info');

    if (window.electronAPI && window.electronAPI.saveExcelFile && state.filePath) {
      const result = await window.electronAPI.saveExcelFile({
        filePath: state.filePath,
        sheetName: state.currentSheet,
        data: state.records,
        headers: state.headers,
        headerRowIndex: state.headerRowIndex
      });

      if (!result.success) {
        throw new Error(result.error || 'บันทึกไฟล์ไม่สำเร็จ');
      }

      showToast(`บันทึกไฟล์ Excel สำเร็จเรียบร้อย! (${state.records.length} รายการ)`, 'success');
    } else {
      // Browser fallback: Export / download updated Excel
      const XLSXLib = window.XLSX || (typeof XLSX !== 'undefined' ? XLSX : null);
      if (!XLSXLib) {
        throw new Error('ไม่พบโมดูล XLSX สำหรับบันทึกไฟล์');
      }

      const cleanData = state.records.map(item => {
        const clean = { ...item };
        delete clean._rowIndex;
        return clean;
      });

      const sheetData = [];
      sheetData.push(state.headers);
      cleanData.forEach(row => {
        sheetData.push(state.headers.map(h => (row[h] !== undefined ? row[h] : '')));
      });

      const wb = XLSXLib.utils.book_new();
      const ws = XLSXLib.utils.aoa_to_sheet(sheetData);
      const sheetName = state.currentSheet || 'รายชื่อบุคลากร';
      XLSXLib.utils.book_append_sheet(wb, ws, sheetName);

      const fileName = state.fileName || `ตารางข้อมูลบัตรประจำตัว_${Date.now()}.xlsx`;
      XLSXLib.writeFile(wb, fileName);

      showToast(`ดาวน์โหลดไฟล์ Excel อัปเดตสำเร็จ! (${state.records.length} รายการ)`, 'success');
    }

    if (elements.btnSaveData) elements.btnSaveData.disabled = false;
  } catch (err) {
    console.error('Failed to save Excel:', err);
    showToast(`เกิดข้อผิดพลาดในการบันทึก: ${err.message}`, 'error');
    if (elements.btnSaveData) elements.btnSaveData.disabled = false;
  } finally {
    state.isSaving = false;
  }
}

/**
 * ==============================================================================
 * SIDEBAR RECORDS LIST & SEARCH
 * ==============================================================================
 */

function renderSidebarList() {
  elements.recordsList.innerHTML = '';

  if (state.records.length > 0 && elements.sidebarSelectAllBar) {
    elements.sidebarSelectAllBar.style.display = 'flex';
    updateSelectionCounterUI();
  } else if (elements.sidebarSelectAllBar) {
    elements.sidebarSelectAllBar.style.display = 'none';
  }

  if (state.filteredRecords.length === 0) {
    elements.recordsList.innerHTML = `
      <div class="empty-state">
        <p>ไม่พบรายการที่ค้นหา</p>
      </div>
    `;
    return;
  }

  // Find Name and Role headers for smart display
  const engSidebarHeader = state.headers.find(h => {
    const lower = h.toLowerCase();
    return (lower.includes('อังกฤษ') || lower.includes('english') || lower.includes('eng') || lower.includes('en_name') || lower.includes('name_en')) && !isImageHeader(h) && !isOrderHeader(h);
  });

  const nameHeader = state.headers.find(h => {
    const lower = h.toLowerCase();
    return (lower.includes('ชื่อ') || lower.includes('นามสกุล') || lower.includes('สกุล') || lower.includes('name') || lower.includes('user') || lower.includes('ผู้')) && h !== engSidebarHeader && !isImageHeader(h) && !isOrderHeader(h);
  });

  const roleHeader = state.headers.find(h => {
    const lower = h.toLowerCase();
    return (lower.includes('ตำแหน่ง') || lower.includes('role') || lower.includes('position') || lower.includes('แผนก') || lower.includes('สังกัด')) && !isImageHeader(h) && !isOrderHeader(h);
  });

  const fallbackHeader = state.headers.find(h =>
    !isImageHeader(h) &&
    !isOrderHeader(h) &&
    h !== 'Timestamp' &&
    h !== 'ตราประทับเวลา' &&
    h !== '_rowIndex'
  ) || state.headers[0];

  const titleHeader = nameHeader || fallbackHeader;

  state.filteredRecords.forEach((record) => {
    const isChecked = state.selectedRowIndices.has(record._rowIndex);
    const isActive = !state.isBatchMode && state.selectedRecord && state.selectedRecord._rowIndex === record._rowIndex;

    const item = document.createElement('div');
    item.className = `record-item ${isActive ? 'active' : ''} ${isChecked ? 'selected' : ''}`;

    const titleVal = (titleHeader && record[titleHeader]) ? record[titleHeader] : `รายการที่ #${record._rowIndex}`;
    const roleVal = (roleHeader && record[roleHeader]) ? record[roleHeader] : `แถวที่: ${record._rowIndex}`;
    const dateVal = record['Timestamp'] || record['ตราประทับเวลา'] || '';

    item.innerHTML = `
      <input type="checkbox" class="custom-checkbox record-item-checkbox" data-row="${record._rowIndex}" ${isChecked ? 'checked' : ''} title="เลือกเพื่อแก้ไขพร้อมกัน" />
      <div class="record-item-body">
        <div class="record-title">${escapeHTML(String(titleVal))}</div>
        <div class="record-sub">
          <span>${escapeHTML(String(roleVal))} (แถว ${record._rowIndex})</span>
          <span>${formatDateString(dateVal)}</span>
        </div>
      </div>
    `;

    // Checkbox click
    const chk = item.querySelector('.record-item-checkbox');
    chk.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleRecordSelection(record._rowIndex, chk.checked);
    });

    // Body click: Switch to single edit mode for this record
    const body = item.querySelector('.record-item-body');
    body.addEventListener('click', () => {
      state.isBatchMode = false;
      selectRecord(record);
    });

    elements.recordsList.appendChild(item);
  });
}

function toggleRecordSelection(rowIndex, isChecked) {
  if (isChecked) {
    state.selectedRowIndices.add(rowIndex);
  } else {
    state.selectedRowIndices.delete(rowIndex);
  }
  updateSelectionCounterUI();
  checkBatchModeTransition();
}

function selectAllRecords(isChecked) {
  if (isChecked) {
    state.selectedRowIndices = new Set(state.records.map(r => r._rowIndex));
  } else {
    state.selectedRowIndices.clear();
  }
  updateSelectionCounterUI();
  renderSidebarList();
  checkBatchModeTransition();
}

function clearRecordSelection() {
  state.selectedRowIndices.clear();
  state.isBatchMode = false;
  updateSelectionCounterUI();
  renderSidebarList();
  if (state.selectedRecord) {
    renderEditorForm();
  } else if (state.records.length > 0) {
    selectRecord(state.records[0]);
  }
}

function updateSelectionCounterUI() {
  const count = state.selectedRowIndices.size;
  const total = state.records.length;

  if (elements.chkSelectAllRecords) {
    elements.chkSelectAllRecords.checked = (total > 0 && count === total);
    elements.chkSelectAllRecords.indeterminate = (count > 0 && count < total);
  }

  if (elements.selectedCountBadge) {
    if (count > 0) {
      elements.selectedCountBadge.style.display = 'inline-block';
      elements.selectedCountBadge.textContent = `${count} เลือกแล้ว`;
    } else {
      elements.selectedCountBadge.style.display = 'none';
    }
  }

  if (elements.btnClearSelection) {
    elements.btnClearSelection.style.display = count > 0 ? 'inline-block' : 'none';
  }
}

function checkBatchModeTransition() {
  const count = state.selectedRowIndices.size;
  if (count > 1) {
    state.isBatchMode = true;
    renderSidebarList();
    renderBatchEditorForm();
  } else if (count === 1) {
    state.isBatchMode = false;
    renderSidebarList();
    const firstRowIndex = [...state.selectedRowIndices][0];
    const rec = state.records.find(r => r._rowIndex === firstRowIndex);
    if (rec) selectRecord(rec);
  } else {
    state.isBatchMode = false;
    renderSidebarList();
    if (state.selectedRecord) {
      renderEditorForm();
    } else if (state.records.length > 0) {
      selectRecord(state.records[0]);
    }
  }
}

function handleSearch() {
  const query = elements.searchInput.value.toLowerCase().trim();
  if (!query) {
    state.filteredRecords = [...state.records];
  } else {
    state.filteredRecords = state.records.filter(rec => {
      return Object.values(rec).some(val =>
        String(val).toLowerCase().includes(query)
      );
    });
  }
  renderSidebarList();
}

function selectRecord(record) {
  state.isBatchMode = false;

  // Retrieve the latest in-memory record data
  const latestRec = state.records.find(r => r._rowIndex === record._rowIndex) || record;

  // Retrieve permanently cached base64 image if exists
  const cachedImg = latestRec._imageBase64 || (state.imageCache && state.imageCache.get(latestRec._rowIndex)) || '';

  state.selectedRecord = {
    ...latestRec,
    _imageBase64: cachedImg
  };
  state.pendingImageUpload = null;
  elements.btnSaveData.disabled = false;

  renderSidebarList();
  renderEditorForm();
  renderLivePreview();
}

/**
 * ==============================================================================
 * THAI CALENDAR & EXPIRY DATE PICKER ENGINE (พ.ศ. 2 ตัวท้าย)
 * ==============================================================================
 */

const THAI_SHORT_MONTHS = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
const THAI_FULL_MONTHS = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];

// Format date into Thai format with 2-digit Buddhist Year (e.g. 31 ธ.ค. 70, 15 ส.ค. 69)
function formatThaiShortDate(day, monthIdx, fullYearBuddhist) {
  const shortMonth = THAI_SHORT_MONTHS[monthIdx] || 'ธ.ค.';
  const twoDigitYear = String(fullYearBuddhist).slice(-2);
  return `${day} ${shortMonth} ${twoDigitYear}`;
}

// Parse existing date string into day, month (0-11), full Buddhist Year (e.g. 2570)
function parseThaiDate(dateStr) {
  const now = new Date();
  const defaultYearTh = now.getFullYear() + 543;
  let day = 31;
  let monthIdx = 11; // ธ.ค.
  let yearTh = defaultYearTh;

  if (!dateStr || typeof dateStr !== 'string') {
    return { day, monthIdx, yearTh };
  }

  const clean = dateStr.trim();

  // Try matching "DD MMM YY" or "DD MMM YYYY" (e.g. "31 ธ.ค. 70" or "31 ธ.ค. 2570")
  for (let m = 0; m < THAI_SHORT_MONTHS.length; m++) {
    const sMon = THAI_SHORT_MONTHS[m];
    const fMon = THAI_FULL_MONTHS[m];
    if (clean.includes(sMon) || clean.includes(fMon)) {
      monthIdx = m;
      const nums = clean.match(/\d+/g);
      if (nums && nums.length >= 1) {
        day = parseInt(nums[0], 10) || 1;
      }
      if (nums && nums.length >= 2) {
        let yr = parseInt(nums[1], 10);
        if (yr < 100) {
          yr += 2500;
        } else if (yr < 2400) {
          yr += 543;
        }
        yearTh = yr;
      }
      return { day, monthIdx, yearTh };
    }
  }

  // Try matching ISO "YYYY-MM-DD"
  const isoMatch = clean.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (isoMatch) {
    let yr = parseInt(isoMatch[1], 10);
    if (yr < 2400) yr += 543;
    monthIdx = Math.max(0, Math.min(11, parseInt(isoMatch[2], 10) - 1));
    day = parseInt(isoMatch[3], 10) || 1;
    yearTh = yr;
    return { day, monthIdx, yearTh };
  }

  return { day, monthIdx, yearTh };
}

// Calendar State
const calendarState = {
  activeInput: null,
  selectedDay: 31,
  selectedMonth: 11,
  selectedYearTh: new Date().getFullYear() + 543,
  isOpen: false
};

function initThaiCalendar() {
  const popover = document.getElementById('thaiCalendarPopover');
  const monthSelect = document.getElementById('calMonthSelect');
  const yearSelect = document.getElementById('calYearSelect');
  const prevBtn = document.getElementById('calPrevMonth');
  const nextBtn = document.getElementById('calNextMonth');
  const quickEOY = document.getElementById('calQuickEOY');
  const quickFiscal = document.getElementById('calQuickFiscal');
  const quickToday = document.getElementById('calQuickToday');

  if (!popover || !monthSelect || !yearSelect) return;

  // Populate Month options
  monthSelect.innerHTML = THAI_FULL_MONTHS.map((m, idx) => `<option value="${idx}">${m}</option>`).join('');

  // Populate Year options (พ.ศ. 2565 - 2585)
  const currentYearTh = new Date().getFullYear() + 543;
  let yearOpts = '';
  for (let y = currentYearTh - 3; y <= currentYearTh + 15; y++) {
    yearOpts += `<option value="${y}">พ.ศ. ${y} (${String(y).slice(-2)})</option>`;
  }
  yearSelect.innerHTML = yearOpts;

  // Change Month/Year listeners
  monthSelect.addEventListener('change', () => {
    calendarState.selectedMonth = parseInt(monthSelect.value, 10);
    renderCalendarGrid();
  });

  yearSelect.addEventListener('change', () => {
    calendarState.selectedYearTh = parseInt(yearSelect.value, 10);
    renderCalendarGrid();
  });

  // Prev / Next Month buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      calendarState.selectedMonth--;
      if (calendarState.selectedMonth < 0) {
        calendarState.selectedMonth = 11;
        calendarState.selectedYearTh--;
      }
      monthSelect.value = calendarState.selectedMonth;
      yearSelect.value = calendarState.selectedYearTh;
      renderCalendarGrid();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      calendarState.selectedMonth++;
      if (calendarState.selectedMonth > 11) {
        calendarState.selectedMonth = 0;
        calendarState.selectedYearTh++;
      }
      monthSelect.value = calendarState.selectedMonth;
      yearSelect.value = calendarState.selectedYearTh;
      renderCalendarGrid();
    });
  }

  // Quick Footers
  if (quickEOY) {
    quickEOY.addEventListener('click', (e) => {
      e.stopPropagation();
      selectCalendarDate(31, 11, calendarState.selectedYearTh);
    });
  }

  if (quickFiscal) {
    quickFiscal.addEventListener('click', (e) => {
      e.stopPropagation();
      selectCalendarDate(30, 8, calendarState.selectedYearTh); // 30 ก.ย.
    });
  }

  if (quickToday) {
    quickToday.addEventListener('click', (e) => {
      e.stopPropagation();
      const now = new Date();
      selectCalendarDate(now.getDate(), now.getMonth(), now.getFullYear() + 543);
    });
  }

  // Close calendar popover on outside click
  document.addEventListener('click', (e) => {
    if (!calendarState.isOpen) return;
    const isInsidePopover = popover.contains(e.target);
    const isTrigger = e.target.closest('.btn-calendar-trigger') || e.target.closest('.date-picker-input');
    if (!isInsidePopover && !isTrigger) {
      closeThaiCalendar();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && calendarState.isOpen) {
      closeThaiCalendar();
    }
  });
}

function openThaiCalendar(targetInput, triggerElement) {
  const popover = document.getElementById('thaiCalendarPopover');
  if (!popover || !targetInput) return;

  calendarState.activeInput = targetInput;
  const parsed = parseThaiDate(targetInput.value);
  calendarState.selectedDay = parsed.day;
  calendarState.selectedMonth = parsed.monthIdx;
  calendarState.selectedYearTh = parsed.yearTh;

  const monthSelect = document.getElementById('calMonthSelect');
  const yearSelect = document.getElementById('calYearSelect');
  if (monthSelect) monthSelect.value = calendarState.selectedMonth;
  if (yearSelect) yearSelect.value = calendarState.selectedYearTh;

  renderCalendarGrid();

  // Make popover temporarily visible to measure dimensions accurately
  popover.style.visibility = 'hidden';
  popover.style.display = 'block';
  const popoverRect = popover.getBoundingClientRect();
  const popoverHeight = popoverRect.height || 340;
  const popoverWidth = popoverRect.width || 320;

  // Calculate viewport coordinates (fixed position)
  const rect = (triggerElement || targetInput).getBoundingClientRect();
  let top = rect.bottom + 6;
  let left = rect.left;

  // Smart Auto-Flip: If not enough room below the input, open ABOVE it!
  const spaceBelow = window.innerHeight - rect.bottom;
  const spaceAbove = rect.top;

  if (spaceBelow < popoverHeight + 12 && spaceAbove > spaceBelow) {
    // Open Above
    top = Math.max(10, rect.top - popoverHeight - 6);
  } else {
    // Open Below (with boundary guard)
    if (top + popoverHeight > window.innerHeight - 10) {
      top = Math.max(10, window.innerHeight - popoverHeight - 10);
    }
  }

  // Horizontal boundary guard
  if (left + popoverWidth > window.innerWidth - 10) {
    left = window.innerWidth - popoverWidth - 10;
  }
  if (left < 10) left = 10;

  popover.style.top = `${top}px`;
  popover.style.left = `${left}px`;
  popover.style.visibility = 'visible';
  calendarState.isOpen = true;
}

function closeThaiCalendar() {
  const popover = document.getElementById('thaiCalendarPopover');
  if (popover) {
    popover.style.display = 'none';
  }
  calendarState.isOpen = false;
  calendarState.activeInput = null;
}

function renderCalendarGrid() {
  const grid = document.getElementById('calDaysGrid');
  if (!grid) return;

  const month = calendarState.selectedMonth;
  const yearTh = calendarState.selectedYearTh;
  const gregYear = yearTh - 543;

  const firstDayOfWeek = new Date(gregYear, month, 1).getDay(); // 0 = Sunday
  const daysInMonth = new Date(gregYear, month + 1, 0).getDate();

  const now = new Date();
  const isCurrentMonth = (now.getMonth() === month && (now.getFullYear() + 543) === yearTh);
  const todayDate = now.getDate();

  let html = '';

  // Empty leading cells
  for (let i = 0; i < firstDayOfWeek; i++) {
    html += '<div class="cal-day-cell empty"></div>';
  }

  // Days of month
  for (let day = 1; day <= daysInMonth; day++) {
    const isSelected = (day === calendarState.selectedDay);
    const isToday = (isCurrentMonth && day === todayDate);
    const classes = ['cal-day-cell'];
    if (isSelected) classes.push('selected');
    if (isToday) classes.push('today');

    html += `<div class="${classes.join(' ')}" data-day="${day}">${day}</div>`;
  }

  grid.innerHTML = html;

  // Attach click to day cells
  grid.querySelectorAll('.cal-day-cell:not(.empty)').forEach(cell => {
    cell.addEventListener('click', (e) => {
      e.stopPropagation();
      const d = parseInt(cell.getAttribute('data-day'), 10);
      selectCalendarDate(d, calendarState.selectedMonth, calendarState.selectedYearTh);
    });
  });
}

function selectCalendarDate(day, monthIdx, fullYearTh) {
  const formatted = formatThaiShortDate(day, monthIdx, fullYearTh); // e.g. "31 ธ.ค. 70"

  if (calendarState.activeInput) {
    calendarState.activeInput.value = formatted;
    // Dispatch input event to sync data and update live card preview
    calendarState.activeInput.dispatchEvent(new Event('input', { bubbles: true }));
    calendarState.activeInput.dispatchEvent(new Event('change', { bubbles: true }));
  }

  closeThaiCalendar();
  showToast(`ตั้งวันหมดอายุ: ${formatted}`, 'info');
}

/**
 * ==============================================================================
 * EDITOR FORM & LOCAL PHOTO MANAGER
 * ==============================================================================
 */

function renderEditorForm() {
  if (!state.selectedRecord) {
    renderEmptyEditor();
    return;
  }

  const rec = state.selectedRecord;
  const imageHeader = state.headers.find(h => isImageHeader(h));
  let currentImageUrl = '';

  if (state.pendingImageUpload && state.pendingImageUpload.base64) {
    currentImageUrl = state.pendingImageUpload.base64;
  } else if (rec._imageBase64) {
    currentImageUrl = rec._imageBase64;
  } else if (state.imageCache && state.imageCache.get(rec._rowIndex)) {
    currentImageUrl = state.imageCache.get(rec._rowIndex);
  } else if (imageHeader && rec[imageHeader]) {
    currentImageUrl = formatImageUrl(rec[imageHeader]);
  }

  const { rankHeader, thaiNameHeader, engRankHeader, engNameHeader, deptHeader, workplaceHeader, startDateHeader, expiryHeader, noteHeader, orderHeader, stripeHeader } = getRankAndNameHeaders();

  // Extract initial values
  let rankTh = rankHeader && rec[rankHeader] !== undefined ? String(rec[rankHeader]) : '';
  let nameTh = thaiNameHeader && rec[thaiNameHeader] !== undefined ? String(rec[thaiNameHeader]) : '';
  if (!rankTh && nameTh) {
    const parsedTh = parseRankAndName(nameTh, false);
    if (parsedTh.rank) {
      rankTh = parsedTh.rank;
      nameTh = parsedTh.name;
    }
  }

  // Convert to full rank for Thai
  const fullRankTh = getFullRankTh(rankTh, nameTh);
  if (fullRankTh) rankTh = fullRankTh;

  if (nameTh.startsWith('หญิง ') && rankTh) {
    nameTh = nameTh.substring(5).trim();
  }

  // Extract initial values for English
  let rankEn = engRankHeader && rec[engRankHeader] !== undefined ? String(rec[engRankHeader]) : '';
  let nameEn = engNameHeader && rec[engNameHeader] !== undefined ? String(rec[engNameHeader]) : '';

  if (!rankEn && nameEn) {
    const parsedEn = parseRankAndName(nameEn, true);
    if (parsedEn.rank) {
      rankEn = parsedEn.rank;
      nameEn = parsedEn.name;
    }
  } else if (rankEn && !nameEn) {
    const parsedEn = parseRankAndName(rankEn, true);
    if (parsedEn.name) {
      rankEn = parsedEn.rank;
      nameEn = parsedEn.name;
    }
  }

  if (rankEn && nameEn.toLowerCase().startsWith(rankEn.toLowerCase())) {
    nameEn = nameEn.substring(rankEn.length).trim().replace(/^\./, '').trim();
  }

  // Auto derive default rankEn from rankTh if rankEn is still empty
  if (!rankEn && rankTh) {
    const match = RANK_TEMPLATES.find(t => t.fullTh === rankTh || t.th === rankTh);
    if (match) rankEn = match.en;
  }

  const deptVal = rec[deptHeader || 'แผนก'] !== undefined ? String(rec[deptHeader || 'แผนก']) : '';
  const workplaceVal = rec[workplaceHeader || 'สถานที่ปฏิบัติงาน'] !== undefined ? String(rec[workplaceHeader || 'สถานที่ปฏิบัติงาน']) : (rec['สถานที่'] !== undefined ? String(rec['สถานที่']) : '');
  const startDateVal = rec[startDateHeader || 'วันที่เริ่มใช้'] !== undefined ? String(rec[startDateHeader || 'วันที่เริ่มใช้']) : (rec['เริ่มใช้'] !== undefined ? String(rec['เริ่มใช้']) : '');
  const expiryVal = rec[expiryHeader || 'วันหมดอายุ'] !== undefined ? String(rec[expiryHeader || 'วันหมดอายุ']) : '';
  const noteVal = rec[noteHeader || 'หมายเหตุ'] !== undefined ? String(rec[noteHeader || 'หมายเหตุ']) : '';
  const cardThemeVal = rec['รูปแบบบัตร'] || state.cardTheme || 'theme-navy-red';
  const currentYearTh = new Date().getFullYear() + 543;

  const docNumVal = rec['เลขที่ใต้รูป'] !== undefined ? String(rec['เลขที่ใต้รูป']) : (rec['เลขที่'] !== undefined ? String(rec['เลขที่']) : '๑๑/๖๘');
  const roleBannerVal = rec['ข้อความแถบสี'] !== undefined ? String(rec['ข้อความแถบสี']) : (rec['แถบสีเหลือง'] !== undefined ? String(rec['แถบสีเหลือง']) : 'นักศึกษาฝึกงาน');
  const orderVal = rec['ลำดับ'] !== undefined ? String(rec['ลำดับ']) : (rec['ลำดับที่'] !== undefined ? String(rec['ลำดับที่']) : '๑');

  // Custom Attached Background Image URL
  let currentBgUrl = '';
  if (rec._bgImageBase64) {
    currentBgUrl = rec._bgImageBase64;
  } else if (state.cardBgImage) {
    currentBgUrl = state.cardBgImage;
  } else if (rec['รูปพื้นหลัง']) {
    currentBgUrl = formatImageUrl(rec['รูปพื้นหลัง']);
  }

  // Stripe Badge Number: ONLY strictly '1' or '2' (NEVER sequential row index)
  const stripeVal = (stripeHeader && rec[stripeHeader] !== undefined)
    ? String(rec[stripeHeader]).trim()
    : (rec['แถบสี'] !== undefined
      ? String(rec['แถบสี']).trim()
      : (rec['หมายเลขแถบสี'] !== undefined
        ? String(rec['หมายเลขแถบสี']).trim()
        : '1'));
  const isStripe2 = (stripeVal === '2');

  let html = `
    <form class="editor-form" id="recordForm" onsubmit="event.preventDefault();">
      <div class="form-header-title form-header-action-bar">
        <span>แก้ไขข้อมูลประจำตัว (แถว Excel ที่ ${rec._rowIndex})</span>
        <div class="record-action-buttons">
          <button type="button" class="btn btn-action-sm btn-duplicate" id="btnDuplicateRecord" title="คัดลอกรายการนี้เพื่อสร้างบุคคลใหม่">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            คัดลอกรายการ
          </button>
          <button type="button" class="btn btn-action-sm btn-delete" id="btnDeleteRecord" title="ลบรายการนี้ออกจากตาราง">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            ลบรายชื่อ
          </button>
        </div>
      </div>

      <!-- 0. Profile Photo Section -->
      <div class="template-section-card">
        <div class="template-section-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
          </svg>
          <span>รูปถ่ายประจำตัว</span>
        </div>

        <div class="image-upload-box">
          <img src="${currentImageUrl || 'assets/logo.png'}" id="formImageThumb" class="image-preview-thumb" alt="รูปพรีวิว" style="${currentImageUrl ? '' : 'display:none;'}" />
          <div class="upload-controls">
            <button type="button" class="btn btn-secondary" id="btnSelectLocalImage">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              เลือกรูปภาพบุคคล (.jpg, .png)
            </button>
            <input type="file" id="localFileInput" accept="image/*" style="display:none;" />
            <small class="help-text">คลิกเพื่อเลือกไฟล์รูปภาพบุคคล รูปภาพจะถูกจัดกึ่งกลางและปรับสัดส่วนอัตโนมัติ</small>
          </div>
        </div>
      </div>

      <!-- 0.1 Card Background Image Section (สำหรับแนบรูปพื้นหลังของบัตร) -->
      <div class="template-section-card">
        <div class="template-section-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
          <span>🖼️ รูปภาพพื้นหลังบัตร (Custom Background Image)</span>
        </div>

        <div class="image-upload-box">
          <img src="${currentBgUrl || ''}" id="formCardBgThumb" class="image-preview-thumb" alt="พรีวิวพื้นหลัง" style="${currentBgUrl ? 'max-height: 55px; width: 85px; object-fit: cover;' : 'display:none;'}" />
          <div class="upload-controls">
            <div style="display: flex; gap: 6px; flex-wrap: wrap;">
              <button type="button" class="btn btn-secondary" id="btnSelectCardBg">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                เลือกรูปพื้นหลัง (.jpg, .png)
              </button>
              <button type="button" class="btn-quick-apply" id="btnApplyBgToAll" title="นำรูปพื้นหลังนี้ไปใช้กับทุกรายชื่อในตาราง" style="${currentBgUrl ? '' : 'display:none;'}">
                ⚡ ใช้พื้นหลังนี้กับทุกคน
              </button>
              <button type="button" class="btn btn-action-sm btn-delete" id="btnRemoveCardBg" title="ลบรูปพื้นหลัง" style="${currentBgUrl ? '' : 'display:none;'}">
                🗑️ ลบพื้นหลัง
              </button>
            </div>
            <input type="file" id="cardBgFileInput" accept="image/*" style="display:none;" />
            <small class="help-text">เลือกรูปพื้นหลังสำหรับรูปแบบที่ 3 (แนวนอน) หรือรูปแบบอื่นๆ รูปภาพจะปรับพอดีกับขนาดบัตรอัตโนมัติ</small>
          </div>
        </div>
      </div>

      <!-- 1. Personal Info Section (Thai Rank/Name & English Rank/Name) -->
      <div class="template-section-card">
        <div class="template-section-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <polyline points="16 11 18 13 22 9"/>
          </svg>
          <span>ข้อมูลบุคคล (ยศ และ ชื่อ-นามสกุล)</span>
        </div>

        <div class="form-grid">
          <!-- Thai Rank (เฉพาะแนวตั้ง) -->
          <div class="form-group" id="formGroupRankTh" style="${cardThemeVal === 'theme-landscape-rtaf' ? 'display: none;' : ''}">
            <label for="templateRankInputTh">ยศ (ภาษาไทย):</label>
            <div class="template-combo-row">
              <select id="templateRankSelectTh" class="template-select" title="เลือกยศมาตรฐาน">
                ${renderRankSelectOptions(rankTh, false)}
              </select>
              <input type="text" id="templateRankInputTh" value="${escapeHTML(rankTh)}" placeholder="ยศภาษาไทย" class="form-input" />
            </div>
          </div>

          <!-- Thai Name -->
          <div class="form-group" id="formGroupNameTh" style="${cardThemeVal === 'theme-landscape-rtaf' ? 'grid-column: 1 / -1;' : ''}">
            <label for="templateNameInputTh">ชื่อ-นามสกุล (ภาษาไทย):</label>
            <input type="text" id="templateNameInputTh" value="${escapeHTML(nameTh)}" placeholder="ชื่อ-นามสกุล ภาษาไทย" class="form-input" />
          </div>

          <!-- English Rank (เฉพาะแนวตั้ง) -->
          <div class="form-group" id="formGroupRankEn" style="${cardThemeVal === 'theme-landscape-rtaf' ? 'display: none;' : ''}">
            <label for="templateRankInputEn">ยศ (ภาษาอังกฤษ):</label>
            <div class="template-combo-row">
              <select id="templateRankSelectEn" class="template-select" title="เลือกยศภาษาอังกฤษ">
                ${renderRankSelectOptions(rankEn, true)}
              </select>
              <input type="text" id="templateRankInputEn" value="${escapeHTML(rankEn)}" placeholder="English Rank (เช่น Flg.Off.)" class="form-input" />
            </div>
          </div>

          <!-- English Name (เฉพาะแนวตั้ง) -->
          <div class="form-group" id="formGroupNameEn" style="${cardThemeVal === 'theme-landscape-rtaf' ? 'display: none;' : ''}">
            <label for="templateNameInputEn">ชื่อ-นามสกุล (ภาษาอังกฤษ):</label>
            <input type="text" id="templateNameInputEn" value="${escapeHTML(nameEn)}" placeholder="English Name (เช่น Sommai Phala)" class="form-input" />
          </div>
        </div>
      </div>

      <!-- 2. Card Metadata Section (Department, Workplace, Dates, Remarks & Stripe Number) -->
      <div class="template-section-card">
        <div class="template-section-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>ข้อมูลสังกัด สถานที่ปฏิบัติงาน และอายุบัตร</span>
        </div>

        <div class="form-grid">
          <!-- Card Design Theme Selector (รูปแบบ/ดีไซน์บัตรประจำตำแหน่ง) -->
          <div class="form-group" id="formGroupCardTheme">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
              <label for="templateCardThemeSelect" style="margin-bottom: 0;">🎨 สไตล์รูปแบบบัตร:</label>
              <button type="button" class="btn-quick-apply" id="btnApplyThemeToAll" title="นำสไตล์บัตรนี้ไปใช้กับทุกรายชื่อในตาราง">
                ⚡ ใช้กับทุกคน
              </button>
            </div>
            <select id="templateCardThemeSelect" class="template-select" style="font-weight: 600; height: 38px;">
              <option value="theme-navy-red" ${cardThemeVal === 'theme-navy-red' ? 'selected' : ''}>🔵 1. มาตรฐาน บน.21 (Navy & Red - แนวตั้ง)</option>
              <option value="theme-gold-executive" ${cardThemeVal === 'theme-gold-executive' ? 'selected' : ''}>👑 2. ผู้บังคับบัญชา / VIP (Royal Gold - แนวตั้ง แถบเหลือง)</option>
              <option value="theme-landscape-rtaf" ${cardThemeVal === 'theme-landscape-rtaf' ? 'selected' : ''}>🪪 3. บัตรประจำตัว แนวนอน (Landscape - 8.5 × 5.5 ซม.)</option>
            </select>
          </div>

          <!-- Stripe Number Badge Dropdown (เฉพาะรูปแบบแนวตั้งที่ 1 และ 2) -->
          <div class="form-group" id="formGroupStripe" style="${cardThemeVal === 'theme-landscape-rtaf' ? 'display: none;' : ''}">
            <label for="templateOrderSelect">หมายเลขบนแถบสี (1 หรือ 2):</label>
            <select id="templateOrderSelect" class="template-select" style="font-weight: 700; height: 38px;">
              <option value="1" ${!isStripe2 ? 'selected' : ''}>1 (ตัวเลขสีขาว ขอบดำ)</option>
              <option value="2" ${isStripe2 ? 'selected' : ''}>2 (ตัวเลขสีเหลือง #ffeb11 ขอบดำ)</option>
            </select>
          </div>

          <!-- Workplace (สถานที่ปฏิบัติงาน - เฉพาะรูปแบบที่ 3 แนวนอน) -->
          <div class="form-group" id="formGroupWorkplace" style="${cardThemeVal === 'theme-landscape-rtaf' ? '' : 'display: none;'}">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
              <label for="templateWorkplaceInput" style="margin-bottom: 0;">🏢 สถานที่ปฏิบัติงาน:</label>
              <button type="button" class="btn-quick-apply" id="btnApplyWorkplaceToAll" title="นำสถานที่ปฏิบัติงานนี้ไปใช้กับทุกรายชื่อในตาราง">
                ⚡ ใช้กับทุกคน
              </button>
            </div>
            <div class="template-combo-row">
              <input type="text" id="templateWorkplaceInput" value="${escapeHTML(workplaceVal)}" placeholder="เช่น กองบิน 21, บก.บน.21, นหก.สก.ยน" class="form-input" />
            </div>
          </div>

          <!-- Department (แผนก / สังกัด - เฉพาะรูปแบบแนวตั้งที่ 1 และ 2) -->
          <div class="form-group" id="formGroupDept" style="${cardThemeVal === 'theme-landscape-rtaf' ? 'display: none;' : ''}">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
              <label for="templateDeptInput" style="margin-bottom: 0;">แผนก / สังกัด:</label>
              <button type="button" class="btn-quick-apply" id="btnApplyDeptToAll" title="นำแผนกนี้ไปใช้กับทุกรายชื่อในตาราง">
                ⚡ ใช้กับทุกคน
              </button>
            </div>
            <div class="template-combo-row">
              <select id="templateDeptSelect" class="template-select" title="เลือกแผนกมาตรฐาน (10+ แผนก)">
                ${renderDeptSelectOptions(deptVal)}
              </select>
              <input type="text" id="templateDeptInput" value="${escapeHTML(deptVal)}" placeholder="แผนก / สังกัด" class="form-input" />
            </div>
          </div>

          <!-- Start Date (วันที่เริ่มใช้บัตร - เฉพาะรูปแบบที่ 3 แนวนอน) -->
          <div class="form-group" id="formGroupStartDate" style="${cardThemeVal === 'theme-landscape-rtaf' ? '' : 'display: none;'}">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
              <label for="templateStartDateInput" style="margin-bottom: 0;">📅 วันที่เริ่มใช้บัตร:</label>
              <button type="button" class="btn-quick-apply" id="btnApplyStartDateToAll" title="นำวันที่เริ่มใช้นี้ไปใช้กับทุกรายชื่อในตาราง">
                ⚡ ใช้กับทุกคน
              </button>
            </div>
            <div class="template-combo-row">
              <div class="date-input-wrapper">
                <input type="text" id="templateStartDateInput" value="${escapeHTML(startDateVal)}" placeholder="เช่น 14 พ.ค. 68" class="form-input date-picker-input" />
                <button type="button" class="btn-calendar-trigger" id="btnOpenStartCalendar" title="เปิดปฏิทินไทย (พ.ศ.)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </button>
              </div>
              <div class="expiry-presets">
                <button type="button" class="preset-chip" id="btnStartPresetToday" title="ตั้งวันเริ่มใช้เป็นวันนี้">วันนี้</button>
                <button type="button" class="preset-chip" id="btnStartPresetSOY" title="ตั้งวันเริ่มใช้ 1 ม.ค. ปีนี้">1 ม.ค. ${String(currentYearTh).slice(-2)}</button>
                <button type="button" class="preset-chip" id="btnStartPresetFiscal" title="ตั้งวันเริ่มใช้ 1 ต.ค. (ต้นปีงบ)">1 ต.ค. ${String(currentYearTh - 1).slice(-2)}</button>
              </div>
            </div>
          </div>

          <!-- Expiry Date (Input + Calendar Button + Presets + Quick Apply to All) -->
          <div class="form-group" id="formGroupExpiry">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
              <label for="templateExpiryInput" style="margin-bottom: 0;">📅 วันหมดอายุบัตร:</label>
              <button type="button" class="btn-quick-apply" id="btnApplyExpiryToAll" title="นำวันหมดอายุนี้ไปใช้กับทุกรายชื่อในตาราง">
                ⚡ ใช้กับทุกคน
              </button>
            </div>
            <div class="template-combo-row">
              <div class="date-input-wrapper">
                <input type="text" id="templateExpiryInput" value="${escapeHTML(expiryVal)}" placeholder="เช่น 23 ส.ค. 70" class="form-input date-picker-input" />
                <button type="button" class="btn-calendar-trigger" id="btnOpenCalendar" title="เปิดปฏิทินไทย (พ.ศ.)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </button>
              </div>
              <div class="expiry-presets">
                <button type="button" class="preset-chip" id="btnExpiryPresetEOY" title="ตั้งวันหมดอายุ สิ้นปีนี้">สิ้นปีนี้</button>
                <button type="button" class="preset-chip" id="btnExpiryPreset1Y" title="ตั้งวันหมดอายุ +1 ปี">+1 ปี</button>
                <button type="button" class="preset-chip" id="btnExpiryPreset2Y" title="ตั้งวันหมดอายุ +2 ปี">+2 ปี</button>
                <button type="button" class="preset-chip" id="btnExpiryPreset5Y" title="ตั้งวันหมดอายุ +5 ปี">+5 ปี</button>
              </div>
            </div>
          </div>

          <!-- Doc Number (เลขที่ใต้รูป - เฉพาะรูปแบบที่ 3 แนวนอน) -->
          <div class="form-group" id="formGroupDocNum" style="${cardThemeVal === 'theme-landscape-rtaf' ? '' : 'display: none;'}">
            <label for="templateDocNumInput">🔢 เลขที่ใต้รูป (เช่น ๑๑/๖๘):</label>
            <input type="text" id="templateDocNumInput" value="${escapeHTML(docNumVal)}" placeholder="เช่น ๑๑/๖๘" class="form-input" />
          </div>

          <!-- Yellow Banner Text (ข้อความบนแถบสีเหลือง - เฉพาะรูปแบบที่ 3 แนวนอน) -->
          <div class="form-group" id="formGroupRoleBanner" style="${cardThemeVal === 'theme-landscape-rtaf' ? '' : 'display: none;'}">
            <label for="templateRoleBannerInput">🏷️ ข้อความบนแถบสีเหลือง (เช่น นักศึกษาฝึกงาน):</label>
            <input type="text" id="templateRoleBannerInput" value="${escapeHTML(roleBannerVal)}" placeholder="เช่น นักศึกษาฝึกงาน" class="form-input" />
          </div>

          <!-- Order Box Value (ลำดับบนแถบสี - เฉพาะรูปแบบที่ 3 แนวนอน) -->
          <div class="form-group" id="formGroupOrderBox" style="${cardThemeVal === 'theme-landscape-rtaf' ? '' : 'display: none;'}">
            <label for="templateOrderBoxInput">🔢 ลำดับบนแถบสี (เช่น ๔ หรือ ๑):</label>
            <input type="text" id="templateOrderBoxInput" value="${escapeHTML(orderVal)}" placeholder="เช่น ๔ หรือ ๑" class="form-input" />
          </div>

          <!-- Remarks (หมายเหตุ - เฉพาะรูปแบบแนวตั้งที่ 1 และ 2) -->
          <div class="form-group form-group-full" id="formGroupNote" style="${cardThemeVal === 'theme-landscape-rtaf' ? 'display: none;' : ''}">
            <label for="templateNoteInput">หมายเหตุ (แสดงมุมขวาล่างของบัตร):</label>
            <input type="text" id="templateNoteInput" value="${escapeHTML(noteVal)}" placeholder="หมายเหตุเพิ่มเติม (เช่น 342)" class="form-input" />
          </div>
        </div>
      </div>

      <!-- 3. Dynamic Form Grid for Remaining Excel Columns -->
      ${renderRemainingFieldsHTML(rec, rankHeader, thaiNameHeader, engRankHeader, engNameHeader, deptHeader, workplaceHeader, startDateHeader, expiryHeader, noteHeader, imageHeader)}

    </form>
  `;

  elements.editorContainer.innerHTML = html;

  // Event Listeners for Template Controls
  bindTemplateFormEvents(rankHeader, thaiNameHeader, engRankHeader, engNameHeader, deptHeader, workplaceHeader, startDateHeader, expiryHeader, noteHeader, orderHeader, stripeHeader);

  // Bind Local Image Selection
  const btnSelectImage = document.getElementById('btnSelectLocalImage');
  if (btnSelectImage) {
    btnSelectImage.addEventListener('click', handleSelectLocalImage);
  }

  // Bind Custom Card Background Selection
  const btnSelectBg = document.getElementById('btnSelectCardBg');
  if (btnSelectBg) {
    btnSelectBg.addEventListener('click', handleSelectCardBgImage);
  }

  const btnApplyBg = document.getElementById('btnApplyBgToAll');
  if (btnApplyBg) {
    btnApplyBg.addEventListener('click', handleApplyBgToAll);
  }

  const btnRemoveBg = document.getElementById('btnRemoveCardBg');
  if (btnRemoveBg) {
    btnRemoveBg.addEventListener('click', handleRemoveCardBgImage);
  }
}

// Handle Select Background Image from local file
async function handleSelectCardBgImage() {
  const fileInput = document.getElementById('cardBgFileInput');
  if (fileInput) {
    fileInput.value = '';
    fileInput.onchange = async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target.result;
        state.cardBgImage = base64;
        localStorage.setItem('app_card_bg_image', base64);
        if (state.selectedRecord) {
          state.selectedRecord._bgImageBase64 = base64;
          const currentIdx = state.records.findIndex(r => r._rowIndex === state.selectedRecord._rowIndex);
          if (currentIdx !== -1) {
            state.records[currentIdx]._bgImageBase64 = base64;
          }
        }
        renderLivePreview();
        renderEditorForm();
        if (elements.btnSaveData) elements.btnSaveData.disabled = false;
        showToast('แนบรูปพื้นหลังบัตรเรียบร้อยแล้ว!', 'success');
      };
      reader.readAsDataURL(file);
    };
    fileInput.click();
  }
}

// Handle Apply Background Image to All Records
function handleApplyBgToAll() {
  const bg = state.cardBgImage || (state.selectedRecord && state.selectedRecord._bgImageBase64);
  if (!bg) {
    showToast('กรุณาเลือกรูปพื้นหลังก่อนนำไปใช้กับทุกคน', 'warning');
    return;
  }
  state.records.forEach(r => { r._bgImageBase64 = bg; });
  if (state.selectedRecord) state.selectedRecord._bgImageBase64 = bg;
  state.cardBgImage = bg;
  localStorage.setItem('app_card_bg_image', bg);
  renderLivePreview();
  renderEditorForm();
  if (elements.btnSaveData) elements.btnSaveData.disabled = false;
  showToast(`นำรูปพื้นหลังไปใช้กับทุกรายชื่อ (${state.records.length} คน) เรียบร้อยแล้ว!`, 'success');
}

// Handle Remove Background Image
function handleRemoveCardBgImage() {
  state.cardBgImage = '';
  localStorage.removeItem('app_card_bg_image');
  if (state.selectedRecord) {
    state.selectedRecord._bgImageBase64 = '';
    const currentIdx = state.records.findIndex(r => r._rowIndex === state.selectedRecord._rowIndex);
    if (currentIdx !== -1) {
      state.records[currentIdx]._bgImageBase64 = '';
    }
  }
  renderLivePreview();
  renderEditorForm();
  if (elements.btnSaveData) elements.btnSaveData.disabled = false;
  showToast('ลบรูปพื้นหลังบัตรเรียบร้อยแล้ว', 'info');
}

// Render Batch Editor Form (When 2+ records are selected)
function renderBatchEditorForm() {
  const count = state.selectedRowIndices.size;
  const currentYearTh = new Date().getFullYear() + 543;

  let html = `
    <div class="batch-editor-card">
      <div class="batch-editor-header">
        <div class="batch-header-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
          <span>โหมดแก้ไขข้อมูลพร้อมกันหลายรายการ</span>
        </div>
        <span class="batch-header-badge">เลือกไว้ ${count} คน</span>
      </div>

      <p style="color: #94a3b8; font-size: 13px; margin-bottom: 18px; line-height: 1.5;">
        ติ๊กเลือกและกรอกเฉพาะช่องที่ต้องการอัปเดตพร้อมกัน ข้อมูลอื่นที่ไม่ได้เลือก (รวมถึง ยศ, ชื่อ-นามสกุล และรูปถ่าย) จะยังคงเดิมปลอดภัย 100%
      </p>

      <div class="batch-fields-list">
        <!-- 1. Batch Expiry Date -->
        <div class="batch-field-card active" id="cardBatchExpiry">
          <label class="batch-field-header" for="chkBatchApplyExpiry">
            <input type="checkbox" id="chkBatchApplyExpiry" class="custom-checkbox" checked />
            <span>อัปเดต วันหมดอายุ ให้ทุกคนที่เลือก:</span>
          </label>
          <div class="template-combo-row" style="margin-top: 6px;">
            <div class="date-input-wrapper">
              <input type="text" id="batchExpiryInput" value="31 ธ.ค. ${String(currentYearTh + 1).slice(-2)}" placeholder="เช่น 31 ธ.ค. 70" class="form-input date-picker-input" />
              <button type="button" class="btn-calendar-trigger" id="btnBatchOpenCalendar" title="เปิดปฏิทินไทย (พ.ศ.)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </button>
            </div>
            <div class="expiry-presets">
              <button type="button" class="preset-chip" id="btnBatchExpEOY">สิ้นปีนี้</button>
              <button type="button" class="preset-chip" id="btnBatchExp1Y">+1 ปี</button>
              <button type="button" class="preset-chip" id="btnBatchExp2Y">+2 ปี</button>
              <button type="button" class="preset-chip" id="btnBatchExp5Y">+5 ปี</button>
            </div>
          </div>
        </div>

        <!-- 1.1 Batch Start Date (เฉพาะรูปแบบที่ 3 แนวนอน) -->
        <div class="batch-field-card" id="cardBatchStartDate" style="${state.cardTheme === 'theme-landscape-rtaf' ? '' : 'display: none;'}">
          <label class="batch-field-header" for="chkBatchApplyStartDate">
            <input type="checkbox" id="chkBatchApplyStartDate" class="custom-checkbox" />
            <span>อัปเดต วันที่เริ่มใช้บัตร ให้ทุกคนที่เลือก:</span>
          </label>
          <div class="template-combo-row" style="margin-top: 6px;">
            <div class="date-input-wrapper">
              <input type="text" id="batchStartDateInput" value="1 ม.ค. ${String(currentYearTh).slice(-2)}" placeholder="เช่น 1 ม.ค. 68" class="form-input date-picker-input" />
              <button type="button" class="btn-calendar-trigger" id="btnBatchOpenStartCalendar" title="เปิดปฏิทินไทย (พ.ศ.)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </button>
            </div>
            <div class="expiry-presets">
              <button type="button" class="preset-chip" id="btnBatchStartPresetToday">วันนี้</button>
              <button type="button" class="preset-chip" id="btnBatchStartPresetSOY">1 ม.ค. ${String(currentYearTh).slice(-2)}</button>
              <button type="button" class="preset-chip" id="btnBatchStartPresetFiscal">1 ต.ค. ${String(currentYearTh - 1).slice(-2)}</button>
            </div>
          </div>
        </div>

        <!-- 2. Batch Workplace (สถานที่ปฏิบัติงาน - เฉพาะรูปแบบที่ 3 แนวนอน) -->
        <div class="batch-field-card" id="cardBatchWorkplace" style="${state.cardTheme === 'theme-landscape-rtaf' ? '' : 'display: none;'}">
          <label class="batch-field-header" for="chkBatchApplyWorkplace">
            <input type="checkbox" id="chkBatchApplyWorkplace" class="custom-checkbox" />
            <span>อัปเดต สถานที่ปฏิบัติงาน ให้ทุกคนที่เลือก:</span>
          </label>
          <div style="margin-top: 6px;">
            <input type="text" id="batchWorkplaceInput" placeholder="เช่น กองบิน 21, บก.บน.21, ฝ่ายการช่าง" class="form-input" />
          </div>
        </div>

        <!-- 2.1 Batch Department (เฉพาะรูปแบบแนวตั้งที่ 1 และ 2) -->
        <div class="batch-field-card" id="cardBatchDept" style="${state.cardTheme === 'theme-landscape-rtaf' ? 'display: none;' : ''}">
          <label class="batch-field-header" for="chkBatchApplyDept">
            <input type="checkbox" id="chkBatchApplyDept" class="custom-checkbox" />
            <span>อัปเดต แผนก / สังกัด ให้ทุกคนที่เลือก:</span>
          </label>
          <div class="template-combo-row" style="margin-top: 6px;">
            <select id="batchDeptSelect" class="template-select" title="เลือกแผนกมาตรฐาน">
              ${renderDeptSelectOptions('')}
            </select>
            <input type="text" id="batchDeptInput" placeholder="หรือพิมพ์ระบุชื่อแผนกเอง" class="form-input" />
          </div>
        </div>

        <!-- 3. Batch Stripe Badge Number (เฉพาะรูปแบบแนวตั้งที่ 1 และ 2) -->
        <div class="batch-field-card" id="cardBatchStripe" style="${state.cardTheme === 'theme-landscape-rtaf' ? 'display: none;' : ''}">
          <label class="batch-field-header" for="chkBatchApplyStripe">
            <input type="checkbox" id="chkBatchApplyStripe" class="custom-checkbox" />
            <span>อัปเดต หมายเลขบนแถบสี (1 หรือ 2):</span>
          </label>
          <div style="margin-top: 6px;">
            <select id="batchStripeSelect" class="template-select" style="font-weight: 700; height: 38px; width: 100%;">
              <option value="1">1 (ตัวเลขสีขาว ขอบดำ)</option>
              <option value="2">2 (ตัวเลขสีเหลือง #ffeb11 ขอบดำ)</option>
            </select>
          </div>
        </div>

        <!-- 4. Batch Remarks (เฉพาะรูปแบบแนวตั้งที่ 1 และ 2) -->
        <div class="batch-field-card" id="cardBatchNote" style="${state.cardTheme === 'theme-landscape-rtaf' ? 'display: none;' : ''}">
          <label class="batch-field-header" for="chkBatchApplyNote">
            <input type="checkbox" id="chkBatchApplyNote" class="custom-checkbox" />
            <span>อัปเดต หมายเหตุ (มุมขวาล่างของบัตร):</span>
          </label>
          <div style="margin-top: 6px;">
            <input type="text" id="batchNoteInput" placeholder="หมายเหตุเพิ่มเติม (เช่น 342)" class="form-input" />
          </div>
        </div>

        <!-- 5. Batch Card Design Theme -->
        <div class="batch-field-card" id="cardBatchTheme">
          <label class="batch-field-header" for="chkBatchApplyTheme">
            <input type="checkbox" id="chkBatchApplyTheme" class="custom-checkbox" />
            <span>อัปเดต สไตล์รูปแบบบัตร ให้ทุกคนที่เลือก:</span>
          </label>
          <div style="margin-top: 6px;">
            <select id="batchThemeSelect" class="template-select" style="font-weight: 600; height: 38px; width: 100%;">
              <option value="theme-navy-red" ${state.cardTheme === 'theme-navy-red' ? 'selected' : ''}>🔵 1. มาตรฐาน บน.21 (Navy & Red - แนวตั้ง)</option>
              <option value="theme-gold-executive" ${state.cardTheme === 'theme-gold-executive' ? 'selected' : ''}>👑 2. ผู้บังคับบัญชา / VIP (Royal Gold - แนวตั้ง แถบเหลือง)</option>
              <option value="theme-landscape-rtaf" ${state.cardTheme === 'theme-landscape-rtaf' ? 'selected' : ''}>🪪 3. บัตรประจำตัว แนวนอน (Landscape - 8.5 × 5.5 ซม.)</option>
            </select>
          </div>
        </div>
      </div>

      <div class="batch-actions-footer">
        <button type="button" class="btn btn-secondary" id="btnCancelBatch">
          ยกเลิก / ล้างการเลือก
        </button>
        <button type="button" class="btn btn-apply-batch" id="btnApplyBatchUpdate">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          นำไปใช้กับทั้ง ${count} คนทันที
        </button>
      </div>
    </div>
  `;

  elements.editorContainer.innerHTML = html;
  bindBatchEditorEvents();
}

function bindBatchEditorEvents() {
  const chkExp = document.getElementById('chkBatchApplyExpiry');
  const inpExp = document.getElementById('batchExpiryInput');
  const chkStartDate = document.getElementById('chkBatchApplyStartDate');
  const inpStartDate = document.getElementById('batchStartDateInput');
  const chkDept = document.getElementById('chkBatchApplyDept');
  const selDept = document.getElementById('batchDeptSelect');
  const inpDept = document.getElementById('batchDeptInput');
  const chkWorkplace = document.getElementById('chkBatchApplyWorkplace');
  const inpWorkplace = document.getElementById('batchWorkplaceInput');
  const chkStripe = document.getElementById('chkBatchApplyStripe');
  const selStripe = document.getElementById('batchStripeSelect');
  const chkNote = document.getElementById('chkBatchApplyNote');
  const inpNote = document.getElementById('batchNoteInput');
  const chkTheme = document.getElementById('chkBatchApplyTheme');
  const selTheme = document.getElementById('batchThemeSelect');

  const btnExp1Y = document.getElementById('btnBatchExp1Y');
  const btnExp2Y = document.getElementById('btnBatchExp2Y');
  const btnExp5Y = document.getElementById('btnBatchExp5Y');
  const btnExpEOY = document.getElementById('btnBatchExpEOY');
  const btnBatchCal = document.getElementById('btnBatchOpenCalendar');

  const btnBatchStartCal = document.getElementById('btnBatchOpenStartCalendar');
  const btnBatchStartToday = document.getElementById('btnBatchStartPresetToday');
  const btnBatchStartSOY = document.getElementById('btnBatchStartPresetSOY');
  const btnBatchStartFiscal = document.getElementById('btnBatchStartPresetFiscal');
  const currentYearTh = new Date().getFullYear() + 543;

  // Calendar Trigger for Batch Editor (Expiry)
  if (btnBatchCal && inpExp) {
    btnBatchCal.addEventListener('click', (e) => {
      e.stopPropagation();
      openThaiCalendar(inpExp, btnBatchCal);
      if (chkExp) chkExp.checked = true;
    });
    inpExp.addEventListener('click', (e) => {
      e.stopPropagation();
      openThaiCalendar(inpExp, inpExp);
      if (chkExp) chkExp.checked = true;
    });
  }

  // Calendar Trigger for Batch Editor (Start Date)
  if (btnBatchStartCal && inpStartDate) {
    btnBatchStartCal.addEventListener('click', (e) => {
      e.stopPropagation();
      openThaiCalendar(inpStartDate, btnBatchStartCal);
      if (chkStartDate) chkStartDate.checked = true;
    });
    inpStartDate.addEventListener('click', (e) => {
      e.stopPropagation();
      openThaiCalendar(inpStartDate, inpStartDate);
      if (chkStartDate) chkStartDate.checked = true;
    });
  }

  if (btnBatchStartToday) btnBatchStartToday.addEventListener('click', () => { if (inpStartDate) { const now = new Date(); inpStartDate.value = `${now.getDate()} ${THAI_SHORT_MONTHS[now.getMonth()]} ${String(currentYearTh).slice(-2)}`; } if (chkStartDate) chkStartDate.checked = true; });
  if (btnBatchStartSOY) btnBatchStartSOY.addEventListener('click', () => { if (inpStartDate) inpStartDate.value = `1 ม.ค. ${String(currentYearTh).slice(-2)}`; if (chkStartDate) chkStartDate.checked = true; });
  if (btnBatchStartFiscal) btnBatchStartFiscal.addEventListener('click', () => { if (inpStartDate) inpStartDate.value = `1 ต.ค. ${String(currentYearTh - 1).slice(-2)}`; if (chkStartDate) chkStartDate.checked = true; });

  if (btnExpEOY) btnExpEOY.addEventListener('click', () => { if (inpExp) inpExp.value = `31 ธ.ค. ${String(currentYearTh).slice(-2)}`; if (chkExp) chkExp.checked = true; });
  if (btnExp1Y) btnExp1Y.addEventListener('click', () => { if (inpExp) inpExp.value = `31 ธ.ค. ${String(currentYearTh + 1).slice(-2)}`; if (chkExp) chkExp.checked = true; });
  if (btnExp2Y) btnExp2Y.addEventListener('click', () => { if (inpExp) inpExp.value = `31 ธ.ค. ${String(currentYearTh + 2).slice(-2)}`; if (chkExp) chkExp.checked = true; });
  if (btnExp5Y) btnExp5Y.addEventListener('click', () => { if (inpExp) inpExp.value = `31 ธ.ค. ${String(currentYearTh + 5).slice(-2)}`; if (chkExp) chkExp.checked = true; });

  if (selDept) {
    selDept.addEventListener('change', (e) => {
      if (inpDept) inpDept.value = e.target.value;
      if (chkDept) chkDept.checked = true;
    });
  }

  if (inpDept) {
    inpDept.addEventListener('input', () => {
      if (chkDept && inpDept.value.trim()) chkDept.checked = true;
    });
  }

  if (inpWorkplace) {
    inpWorkplace.addEventListener('input', () => {
      if (chkWorkplace && inpWorkplace.value.trim()) chkWorkplace.checked = true;
    });
  }

  if (selStripe) {
    selStripe.addEventListener('change', () => {
      if (chkStripe) chkStripe.checked = true;
    });
  }

  if (inpNote) {
    inpNote.addEventListener('input', () => {
      if (chkNote && inpNote.value.trim()) chkNote.checked = true;
    });
  }

  if (selTheme) {
    selTheme.addEventListener('change', (e) => {
      const themeVal = e.target.value;
      const isLandscape = (themeVal === 'theme-landscape-rtaf');
      const bStripe = document.getElementById('cardBatchStripe');
      const bDept = document.getElementById('cardBatchDept');
      const bNote = document.getElementById('cardBatchNote');
      const bWorkplace = document.getElementById('cardBatchWorkplace');
      const bStartDate = document.getElementById('cardBatchStartDate');
      if (bStripe) bStripe.style.display = isLandscape ? 'none' : 'block';
      if (bDept) bDept.style.display = isLandscape ? 'none' : 'block';
      if (bNote) bNote.style.display = isLandscape ? 'none' : 'block';
      if (bWorkplace) bWorkplace.style.display = isLandscape ? 'block' : 'none';
      if (bStartDate) bStartDate.style.display = isLandscape ? 'block' : 'none';
      if (chkTheme) chkTheme.checked = true;
    });
  }

  // Cancel / Clear selection button
  const btnCancel = document.getElementById('btnCancelBatch');
  if (btnCancel) {
    btnCancel.addEventListener('click', clearRecordSelection);
  }

  // Apply Batch Update button
  const btnApply = document.getElementById('btnApplyBatchUpdate');
  if (btnApply) {
    btnApply.addEventListener('click', () => {
      const applyExpiry = chkExp && chkExp.checked;
      const expiryVal = inpExp ? inpExp.value.trim() : '';

      const applyStartDate = chkStartDate && chkStartDate.checked;
      const startDateVal = inpStartDate ? inpStartDate.value.trim() : '';

      const applyDept = chkDept && chkDept.checked;
      const deptVal = inpDept ? inpDept.value.trim() : '';

      const applyWorkplace = chkWorkplace && chkWorkplace.checked;
      const workplaceVal = inpWorkplace ? inpWorkplace.value.trim() : '';

      const applyStripe = chkStripe && chkStripe.checked;
      const stripeVal = selStripe ? selStripe.value : '1';

      const applyNote = chkNote && chkNote.checked;
      const noteVal = inpNote ? inpNote.value.trim() : '';

      const applyTheme = chkTheme && chkTheme.checked;
      const themeVal = selTheme ? selTheme.value : 'theme-navy-red';

      if (!applyExpiry && !applyStartDate && !applyDept && !applyWorkplace && !applyStripe && !applyNote && !applyTheme) {
        showToast('กรุณาติ๊กเลือกอย่างน้อย 1 รายการที่ต้องการอัปเดต', 'warning');
        return;
      }

      const { deptHeader, workplaceHeader, startDateHeader, expiryHeader, noteHeader, stripeHeader } = getRankAndNameHeaders();
      const finalDeptKey = deptHeader || 'แผนก';
      const finalWorkplaceKey = workplaceHeader || 'สถานที่ปฏิบัติงาน';
      const finalStartDateKey = startDateHeader || 'วันที่เริ่มใช้';
      const finalExpKey = expiryHeader || 'วันหมดอายุ';
      const finalNoteKey = noteHeader || 'หมายเหตุ';
      const finalStripeKey = stripeHeader || 'แถบสี';

      let updatedCount = 0;
      state.records.forEach(rec => {
        if (state.selectedRowIndices.has(rec._rowIndex)) {
          if (applyExpiry) rec[finalExpKey] = expiryVal;
          if (applyStartDate) rec[finalStartDateKey] = startDateVal;
          if (applyDept) rec[finalDeptKey] = deptVal;
          if (applyWorkplace) rec[finalWorkplaceKey] = workplaceVal;
          if (applyStripe) rec[finalStripeKey] = stripeVal;
          if (applyNote) rec[finalNoteKey] = noteVal;
          if (applyTheme) rec['รูปแบบบัตร'] = themeVal;
          updatedCount++;
        }
      });

      if (state.selectedRecord && state.selectedRowIndices.has(state.selectedRecord._rowIndex)) {
        if (applyExpiry) state.selectedRecord[finalExpKey] = expiryVal;
        if (applyStartDate) state.selectedRecord[finalStartDateKey] = startDateVal;
        if (applyDept) state.selectedRecord[finalDeptKey] = deptVal;
        if (applyWorkplace) state.selectedRecord[finalWorkplaceKey] = workplaceVal;
        if (applyStripe) state.selectedRecord[finalStripeKey] = stripeVal;
        if (applyNote) state.selectedRecord[finalNoteKey] = noteVal;
        if (applyTheme) {
          state.selectedRecord['รูปแบบบัตร'] = themeVal;
          setCardTheme(themeVal, false);
        }
        renderLivePreview();
      }

      renderSidebarList();
      if (elements.btnSaveData) elements.btnSaveData.disabled = false;
      showToast(`อัปเดตข้อมูล ${updatedCount} รายชื่อเรียบร้อยแล้ว!`, 'success');
    });
  }
}

function renderRemainingFieldsHTML(rec, rankHeader, thaiNameHeader, engRankHeader, engNameHeader, deptHeader, workplaceHeader, startDateHeader, expiryHeader, noteHeader, imageHeader) {
  const isIgnored = (h) => {
    if (!h) return true;
    if (String(h).startsWith('_')) return true;
    if (isImageHeader(h)) return true;
    if (isOrderHeader(h) || h === 'ลำดับ') return true;
    if (h === rankHeader || h === thaiNameHeader || h === engRankHeader || h === engNameHeader) return true;
    if (h === deptHeader || h === workplaceHeader || h === startDateHeader || h === expiryHeader || h === noteHeader) return true;
    if (h === 'แผนก' || h === 'สถานที่' || h === 'สถานที่ปฏิบัติงาน' || h === 'วันที่เริ่มใช้' || h === 'เริ่มใช้' || h === 'วันหมดอายุ' || h === 'หมายเหตุ' || h === 'แถบสี' || h === 'หมายเลขแถบสี' || h === 'รูปแบบบัตร' || h === 'รูปพื้นหลัง') return true;
    return false;
  };

  const remaining = state.headers.filter(h => !isIgnored(h));
  if (remaining.length === 0) return '';

  let html = `
    <div class="form-header-title" style="margin-top: 10px; font-size: 15px;">
      <span>คอลัมน์ข้อมูลเพิ่มเติมจากไฟล์ Excel</span>
    </div>
    <div class="form-grid">
  `;

  remaining.forEach(header => {
    const val = rec[header] !== undefined ? rec[header] : '';
    html += `
      <div class="form-group">
        <label for="field_${escapeHTML(header)}">${escapeHTML(header)}:</label>
        <input type="text" id="field_${escapeHTML(header)}" data-header="${escapeHTML(header)}" value="${escapeHTML(String(val))}" class="form-input remaining-form-input" />
      </div>
    `;
  });

  html += `</div>`;
  return html;
}

function bindTemplateFormEvents(rankHeader, thaiNameHeader, engRankHeader, engNameHeader, deptHeader, workplaceHeader, startDateHeader, expiryHeader, noteHeader, orderHeader, stripeHeader) {
  const selOrder = document.getElementById('templateOrderSelect');
  const selRankTh = document.getElementById('templateRankSelectTh');
  const inpRankTh = document.getElementById('templateRankInputTh');
  const inpNameTh = document.getElementById('templateNameInputTh');
  const selRankEn = document.getElementById('templateRankSelectEn');
  const inpRankEn = document.getElementById('templateRankInputEn');
  const inpNameEn = document.getElementById('templateNameInputEn');
  const selDept = document.getElementById('templateDeptSelect');
  const inpDept = document.getElementById('templateDeptInput');
  const inpWorkplace = document.getElementById('templateWorkplaceInput');
  const inpStartDate = document.getElementById('templateStartDateInput');
  const inpExpiry = document.getElementById('templateExpiryInput');
  const inpDocNum = document.getElementById('templateDocNumInput');
  const inpRoleBanner = document.getElementById('templateRoleBannerInput');
  const inpOrderBox = document.getElementById('templateOrderBoxInput');
  const inpNote = document.getElementById('templateNoteInput');
  const btnOpenCal = document.getElementById('btnOpenCalendar');
  const btnOpenStartCal = document.getElementById('btnOpenStartCalendar');

  // Thai Calendar Trigger for Single Record Editor (Expiry)
  if (btnOpenCal && inpExpiry) {
    btnOpenCal.addEventListener('click', (e) => {
      e.stopPropagation();
      openThaiCalendar(inpExpiry, btnOpenCal);
    });
    inpExpiry.addEventListener('click', (e) => {
      e.stopPropagation();
      openThaiCalendar(inpExpiry, inpExpiry);
    });
  }

  // Thai Calendar Trigger for Single Record Editor (Start Date)
  if (btnOpenStartCal && inpStartDate) {
    btnOpenStartCal.addEventListener('click', (e) => {
      e.stopPropagation();
      openThaiCalendar(inpStartDate, btnOpenStartCal);
    });
    inpStartDate.addEventListener('click', (e) => {
      e.stopPropagation();
      openThaiCalendar(inpStartDate, inpStartDate);
    });
  }

  // Start Date Presets
  const btnStartToday = document.getElementById('btnStartPresetToday');
  const btnStartSOY = document.getElementById('btnStartPresetSOY');
  const btnStartFiscal = document.getElementById('btnStartPresetFiscal');
  const currentYearTh = new Date().getFullYear() + 543;

  if (btnStartToday) {
    btnStartToday.addEventListener('click', () => {
      if (inpStartDate) {
        const now = new Date();
        inpStartDate.value = `${now.getDate()} ${THAI_SHORT_MONTHS[now.getMonth()]} ${String(currentYearTh).slice(-2)}`;
        syncRecordValues();
        showToast(`ตั้งวันเริ่มใช้: ${inpStartDate.value}`, 'info');
      }
    });
  }
  if (btnStartSOY) {
    btnStartSOY.addEventListener('click', () => {
      if (inpStartDate) {
        inpStartDate.value = `1 ม.ค. ${String(currentYearTh).slice(-2)}`;
        syncRecordValues();
        showToast(`ตั้งวันเริ่มใช้: 1 ม.ค. ${String(currentYearTh).slice(-2)}`, 'info');
      }
    });
  }
  if (btnStartFiscal) {
    btnStartFiscal.addEventListener('click', () => {
      if (inpStartDate) {
        inpStartDate.value = `1 ต.ค. ${String(currentYearTh - 1).slice(-2)}`;
        syncRecordValues();
        showToast(`ตั้งวันเริ่มใช้: 1 ต.ค. ${String(currentYearTh - 1).slice(-2)}`, 'info');
      }
    });
  }

  // Expiry Presets (Output 2-Digit Buddhist Year: e.g. 31 ธ.ค. 70, 31 ธ.ค. 68)
  const btnExp1Y = document.getElementById('btnExpiryPreset1Y');
  const btnExp2Y = document.getElementById('btnExpiryPreset2Y');
  const btnExp5Y = document.getElementById('btnExpiryPreset5Y');
  const btnExpEOY = document.getElementById('btnExpiryPresetEOY');

  if (btnExpEOY) {
    btnExpEOY.addEventListener('click', () => {
      if (inpExpiry) {
        inpExpiry.value = `31 ธ.ค. ${String(currentYearTh).slice(-2)}`;
        syncRecordValues();
        showToast(`ตั้งวันหมดอายุ: 31 ธ.ค. ${String(currentYearTh).slice(-2)}`, 'info');
      }
    });
  }
  if (btnExp1Y) {
    btnExp1Y.addEventListener('click', () => {
      if (inpExpiry) {
        inpExpiry.value = `31 ธ.ค. ${String(currentYearTh + 1).slice(-2)}`;
        syncRecordValues();
        showToast(`ตั้งวันหมดอายุ: 31 ธ.ค. ${String(currentYearTh + 1).slice(-2)}`, 'info');
      }
    });
  }
  if (btnExp2Y) {
    btnExp2Y.addEventListener('click', () => {
      if (inpExpiry) {
        inpExpiry.value = `31 ธ.ค. ${String(currentYearTh + 2).slice(-2)}`;
        syncRecordValues();
        showToast(`ตั้งวันหมดอายุ: 31 ธ.ค. ${String(currentYearTh + 2).slice(-2)}`, 'info');
      }
    });
  }
  if (btnExp5Y) {
    btnExp5Y.addEventListener('click', () => {
      if (inpExpiry) {
        inpExpiry.value = `31 ธ.ค. ${String(currentYearTh + 5).slice(-2)}`;
        syncRecordValues();
        showToast(`ตั้งวันหมดอายุ: 31 ธ.ค. ${String(currentYearTh + 5).slice(-2)}`, 'info');
      }
    });
  }

  // Department Dropdown Sync
  if (selDept) {
    selDept.addEventListener('change', (e) => {
      if (inpDept) {
        inpDept.value = e.target.value;
        syncRecordValues();
      }
    });
  }

  // Quick Apply Department to All Records in Table
  const btnApplyDept = document.getElementById('btnApplyDeptToAll');
  if (btnApplyDept) {
    btnApplyDept.addEventListener('click', () => {
      const val = inpDept ? inpDept.value.trim() : '';
      if (!val) {
        showToast('กรุณาระบุชื่อแผนกก่อนนำไปใช้กับทุกคน', 'warning');
        return;
      }
      const finalDeptKey = deptHeader || 'แผนก';
      state.records.forEach(r => { r[finalDeptKey] = val; });
      if (state.selectedRecord) state.selectedRecord[finalDeptKey] = val;
      renderLivePreview();
      renderSidebarList();
      if (elements.btnSaveData) elements.btnSaveData.disabled = false;
      showToast(`นำแผนก "${val}" ไปใช้กับทุกรายชื่อ (${state.records.length} คน) เรียบร้อยแล้ว!`, 'success');
    });
  }

  // Quick Apply Workplace to All Records in Table
  const btnApplyWorkplace = document.getElementById('btnApplyWorkplaceToAll');
  if (btnApplyWorkplace) {
    btnApplyWorkplace.addEventListener('click', () => {
      const val = inpWorkplace ? inpWorkplace.value.trim() : '';
      if (!val) {
        showToast('กรุณาระบุสถานที่ปฏิบัติงานก่อนนำไปใช้กับทุกคน', 'warning');
        return;
      }
      const finalWorkplaceKey = workplaceHeader || 'สถานที่ปฏิบัติงาน';
      state.records.forEach(r => { r[finalWorkplaceKey] = val; });
      if (state.selectedRecord) state.selectedRecord[finalWorkplaceKey] = val;
      renderLivePreview();
      renderSidebarList();
      if (elements.btnSaveData) elements.btnSaveData.disabled = false;
      showToast(`นำสถานที่ปฏิบัติงาน "${val}" ไปใช้กับทุกรายชื่อ (${state.records.length} คน) เรียบร้อยแล้ว!`, 'success');
    });
  }

  // Quick Apply Start Date to All Records in Table
  const btnApplyStartDate = document.getElementById('btnApplyStartDateToAll');
  if (btnApplyStartDate) {
    btnApplyStartDate.addEventListener('click', () => {
      const val = inpStartDate ? inpStartDate.value.trim() : '';
      if (!val) {
        showToast('กรุณาระบุวันที่เริ่มใช้ก่อนนำไปใช้กับทุกคน', 'warning');
        return;
      }
      const finalStartDateKey = startDateHeader || 'วันที่เริ่มใช้';
      state.records.forEach(r => { r[finalStartDateKey] = val; });
      if (state.selectedRecord) state.selectedRecord[finalStartDateKey] = val;
      renderLivePreview();
      renderSidebarList();
      if (elements.btnSaveData) elements.btnSaveData.disabled = false;
      showToast(`นำวันที่เริ่มใช้ "${val}" ไปใช้กับทุกรายชื่อ (${state.records.length} คน) เรียบร้อยแล้ว!`, 'success');
    });
  }

  // Quick Apply Expiry Date to All Records in Table
  const btnApplyExpiry = document.getElementById('btnApplyExpiryToAll');
  if (btnApplyExpiry) {
    btnApplyExpiry.addEventListener('click', () => {
      const val = inpExpiry ? inpExpiry.value.trim() : '';
      if (!val) {
        showToast('กรุณาระบุวันหมดอายุก่อนนำไปใช้กับทุกคน', 'warning');
        return;
      }
      const finalExpKey = expiryHeader || 'วันหมดอายุ';
      state.records.forEach(r => { r[finalExpKey] = val; });
      if (state.selectedRecord) state.selectedRecord[finalExpKey] = val;
      renderLivePreview();
      renderSidebarList();
      if (elements.btnSaveData) elements.btnSaveData.disabled = false;
      showToast(`นำวันหมดอายุ "${val}" ไปใช้กับทุกรายชื่อ (${state.records.length} คน) เรียบร้อยแล้ว!`, 'success');
    });
  }

  // Card Theme Selector & Quick Apply to All
  const selCardTheme = document.getElementById('templateCardThemeSelect');
  if (selCardTheme) {
    selCardTheme.addEventListener('change', (e) => {
      setCardTheme(e.target.value, true);
      renderLivePreview();
    });
  }

  const btnApplyTheme = document.getElementById('btnApplyThemeToAll');
  if (btnApplyTheme && selCardTheme) {
    btnApplyTheme.addEventListener('click', () => {
      const themeVal = selCardTheme.value;
      state.records.forEach(r => { r['รูปแบบบัตร'] = themeVal; });
      if (state.selectedRecord) state.selectedRecord['รูปแบบบัตร'] = themeVal;
      setCardTheme(themeVal, true);
      renderLivePreview();
      if (elements.btnSaveData) elements.btnSaveData.disabled = false;
      showToast(`นำสไตล์บัตร "${selCardTheme.options[selCardTheme.selectedIndex].text}" ไปใช้กับทุกรายชื่อ (${state.records.length} คน) เรียบร้อยแล้ว!`, 'success');
    });
  }

  // Stripe Badge Number Select (Strictly 1 or 2 Only)
  if (selOrder) {
    selOrder.addEventListener('change', (e) => {
      const val = e.target.value === '2' ? '2' : '1';
      const finalStripeKey = stripeHeader || 'แถบสี';
      if (state.selectedRecord) {
        state.selectedRecord[finalStripeKey] = val;
        const currentIdx = state.records.findIndex(r => r._rowIndex === state.selectedRecord._rowIndex);
        if (currentIdx !== -1) {
          state.records[currentIdx][finalStripeKey] = val;
        }
        renderLivePreview();
        if (elements.btnSaveData) elements.btnSaveData.disabled = false;
      }
    });
  }

  // Duplicate & Delete Record Buttons
  const btnDup = document.getElementById('btnDuplicateRecord');
  if (btnDup) {
    btnDup.addEventListener('click', duplicateRecord);
  }

  const btnDel = document.getElementById('btnDeleteRecord');
  if (btnDel) {
    btnDel.addEventListener('click', deleteRecord);
  }

  // Auto-sync Thai Rank Select to Inputs & English Rank Select
  if (selRankTh) {
    selRankTh.addEventListener('change', (e) => {
      const val = e.target.value;
      const match = RANK_TEMPLATES.find(t => t.th === val || t.fullTh === val);
      const fullRankName = match ? match.fullTh : val;
      if (inpRankTh) inpRankTh.value = fullRankName;

      if (match) {
        if (selRankEn) selRankEn.value = match.en;
        if (inpRankEn) inpRankEn.value = match.en;
      }
      syncRecordValues();
    });
  }

  // Auto-sync English Rank Select to Input
  if (selRankEn) {
    selRankEn.addEventListener('change', (e) => {
      if (inpRankEn) inpRankEn.value = e.target.value;
      syncRecordValues();
    });
  }

  // Bind inputs to record sync
  const inputs = [inpRankTh, inpNameTh, inpRankEn, inpNameEn, inpDept, inpWorkplace, inpStartDate, inpExpiry, inpDocNum, inpRoleBanner, inpOrderBox, inpNote];
  inputs.forEach(inp => {
    if (inp) {
      inp.addEventListener('input', syncRecordValues);
    }
  });

  // Bind remaining inputs
  const remainingInputs = elements.editorContainer.querySelectorAll('.remaining-form-input');
  remainingInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      const header = e.target.getAttribute('data-header');
      if (header && state.selectedRecord) {
        state.selectedRecord[header] = e.target.value;
        const currentIdx = state.records.findIndex(r => r._rowIndex === state.selectedRecord._rowIndex);
        if (currentIdx !== -1) {
          state.records[currentIdx][header] = e.target.value;
        }
        const filteredIdx = state.filteredRecords.findIndex(r => r._rowIndex === state.selectedRecord._rowIndex);
        if (filteredIdx !== -1) {
          state.filteredRecords[filteredIdx][header] = e.target.value;
        }
        if (elements.btnSaveData) elements.btnSaveData.disabled = false;
        renderLivePreview();
      }
    });
  });

  function syncRecordValues() {
    if (!state.selectedRecord) return;
    const rec = state.selectedRecord;

    const rTh = inpRankTh ? inpRankTh.value.trim() : '';
    const nTh = inpNameTh ? inpNameTh.value.trim() : '';
    const rEn = inpRankEn ? inpRankEn.value.trim() : '';
    const nEn = inpNameEn ? inpNameEn.value.trim() : '';
    const dept = inpDept ? inpDept.value.trim() : '';
    const workplace = inpWorkplace ? inpWorkplace.value.trim() : '';
    const startDate = inpStartDate ? inpStartDate.value.trim() : '';
    const exp = inpExpiry ? inpExpiry.value.trim() : '';
    const docNum = inpDocNum ? inpDocNum.value.trim() : '';
    const roleBanner = inpRoleBanner ? inpRoleBanner.value.trim() : '';
    const orderBox = inpOrderBox ? inpOrderBox.value.trim() : '';
    const note = inpNote ? inpNote.value.trim() : '';
    const stripeNumVal = (selOrder && selOrder.value === '2') ? '2' : '1';
    const cardThemeVal = selCardTheme ? selCardTheme.value : (rec['รูปแบบบัตร'] || state.cardTheme || 'theme-navy-red');

    // Ensure essential headers exist in headers array
    if (rankHeader && !state.headers.includes(rankHeader)) state.headers.push(rankHeader);
    if (thaiNameHeader && !state.headers.includes(thaiNameHeader)) state.headers.push(thaiNameHeader);
    if (engRankHeader && !state.headers.includes(engRankHeader)) state.headers.push(engRankHeader);
    if (engNameHeader && !state.headers.includes(engNameHeader)) state.headers.push(engNameHeader);

    const finalDeptHeader = deptHeader || 'แผนก';
    const finalWorkplaceHeader = workplaceHeader || 'สถานที่ปฏิบัติงาน';
    const finalStartDateHeader = startDateHeader || 'วันที่เริ่มใช้';
    const finalExpiryHeader = expiryHeader || 'วันหมดอายุ';
    const finalNoteHeader = noteHeader || 'หมายเหตุ';
    const finalStripeKey = stripeHeader || 'แถบสี';

    if (!state.headers.includes(finalDeptHeader)) state.headers.push(finalDeptHeader);
    if (!state.headers.includes(finalWorkplaceHeader)) state.headers.push(finalWorkplaceHeader);
    if (!state.headers.includes(finalStartDateHeader)) state.headers.push(finalStartDateHeader);
    if (!state.headers.includes(finalExpiryHeader)) state.headers.push(finalExpiryHeader);
    if (!state.headers.includes(finalNoteHeader)) state.headers.push(finalNoteHeader);
    if (!state.headers.includes(finalStripeKey)) state.headers.push(finalStripeKey);

    // Write Thai Rank & Name
    if (rankHeader) {
      rec[rankHeader] = rTh;
      if (thaiNameHeader) rec[thaiNameHeader] = nTh;
    } else if (thaiNameHeader) {
      rec[thaiNameHeader] = rTh ? `${rTh} ${nTh}`.trim() : nTh;
    }

    // Write English Rank & Name
    if (engRankHeader && engNameHeader) {
      rec[engRankHeader] = rEn;
      rec[engNameHeader] = nEn;
    } else if (engNameHeader) {
      rec[engNameHeader] = rEn ? `${rEn} ${nEn}`.trim() : nEn;
    } else if (engRankHeader) {
      rec[engRankHeader] = rEn ? `${rEn} ${nEn}`.trim() : nEn;
    } else {
      rec['ชื่อ-นามสกุล (อังกฤษ)'] = rEn ? `${rEn} ${nEn}`.trim() : nEn;
    }

    // Write Metadata & Theme
    rec[finalDeptHeader] = dept;
    rec[finalWorkplaceHeader] = workplace;
    rec[finalStartDateHeader] = startDate;
    rec[finalExpiryHeader] = exp;
    if (docNum) rec['เลขที่ใต้รูป'] = docNum;
    if (roleBanner) rec['ข้อความแถบสี'] = roleBanner;
    if (orderBox) rec['ลำดับ'] = orderBox;
    rec[finalNoteHeader] = note;
    rec[finalStripeKey] = stripeNumVal;
    rec['รูปแบบบัตร'] = cardThemeVal;

    // Immediately persist changes to global records array so switching people keeps all changes!
    const currentIdx = state.records.findIndex(r => r._rowIndex === rec._rowIndex);
    if (currentIdx !== -1) {
      Object.assign(state.records[currentIdx], rec);
    }
    const filteredIdx = state.filteredRecords.findIndex(r => r._rowIndex === rec._rowIndex);
    if (filteredIdx !== -1) {
      Object.assign(state.filteredRecords[filteredIdx], rec);
    }

    if (elements.btnSaveData) elements.btnSaveData.disabled = false;

    renderLivePreview();
  }
}

// Select Local Profile Image
async function handleSelectLocalImage() {
  if (!state.selectedRecord) {
    showToast('กรุณาเลือกรายชื่อบุคคลก่อนเปลี่ยนรูปภาพ', 'info');
    return;
  }
  if (state.isOpeningImageDialog) return;
  state.isOpeningImageDialog = true;

  try {
    if (window.electronAPI && window.electronAPI.selectImageDialog) {
      const result = await window.electronAPI.selectImageDialog();
      if (result && result.success && result.base64) {
        const base64 = result.base64;
        const fileName = result.fileName;
        const filePath = result.filePath;

        state.pendingImageUpload = {
          base64: base64,
          filename: fileName,
          localPath: filePath
        };

        const imageHeader = state.headers.find(h => isImageHeader(h)) || 'รูปถ่าย';
        if (!state.headers.includes(imageHeader)) {
          state.headers.push(imageHeader);
        }

        // Cache permanently in selected record
        state.selectedRecord[imageHeader] = fileName;
        state.selectedRecord._imageBase64 = base64;
        state.selectedRecord._imagePath = filePath;

        // Store in global memory image cache
        if (!state.imageCache) state.imageCache = new Map();
        state.imageCache.set(state.selectedRecord._rowIndex, base64);

        // Update in state.records array
        const currentIdx = state.records.findIndex(r => r._rowIndex === state.selectedRecord._rowIndex);
        if (currentIdx !== -1) {
          state.records[currentIdx][imageHeader] = fileName;
          state.records[currentIdx]._imageBase64 = base64;
          state.records[currentIdx]._imagePath = filePath;
        }

        // Update in state.filteredRecords array
        const filteredIdx = state.filteredRecords.findIndex(r => r._rowIndex === state.selectedRecord._rowIndex);
        if (filteredIdx !== -1) {
          state.filteredRecords[filteredIdx][imageHeader] = fileName;
          state.filteredRecords[filteredIdx]._imageBase64 = base64;
          state.filteredRecords[filteredIdx]._imagePath = filePath;
        }

        // Update form image preview
        const formThumb = document.getElementById('formImageThumb');
        if (formThumb) {
          formThumb.src = base64;
          formThumb.style.display = 'block';
        }

        renderLivePreview();
        if (elements.btnSaveData) elements.btnSaveData.disabled = false;
        showToast(`เลือกรูปภาพ ${fileName} และฝังลงในข้อมูลสำเร็จ!`, 'success');
      }
    } else {
      // Browser fallback: HTML5 File Input
      let inputElem = document.getElementById('localFileInput');
      if (!inputElem) {
        inputElem = document.createElement('input');
        inputElem.type = 'file';
        inputElem.id = 'localFileInput';
        inputElem.accept = 'image/*';
        inputElem.style.display = 'none';
        document.body.appendChild(inputElem);
      }
      inputElem.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (re) => {
            const base64 = re.target.result;
            state.pendingImageUpload = {
              base64: base64,
              filename: file.name,
              localPath: file.name
            };

            const imageHeader = state.headers.find(h => isImageHeader(h)) || 'รูปถ่าย';
            if (!state.headers.includes(imageHeader)) {
              state.headers.push(imageHeader);
            }

            state.selectedRecord[imageHeader] = file.name;
            state.selectedRecord._imageBase64 = base64;
            state.selectedRecord._imagePath = file.name;

            if (!state.imageCache) state.imageCache = new Map();
            state.imageCache.set(state.selectedRecord._rowIndex, base64);

            const currentIdx = state.records.findIndex(r => r._rowIndex === state.selectedRecord._rowIndex);
            if (currentIdx !== -1) {
              state.records[currentIdx][imageHeader] = file.name;
              state.records[currentIdx]._imageBase64 = base64;
              state.records[currentIdx]._imagePath = file.name;
            }

            const filteredIdx = state.filteredRecords.findIndex(r => r._rowIndex === state.selectedRecord._rowIndex);
            if (filteredIdx !== -1) {
              state.filteredRecords[filteredIdx][imageHeader] = file.name;
              state.filteredRecords[filteredIdx]._imageBase64 = base64;
              state.filteredRecords[filteredIdx]._imagePath = file.name;
            }

            const formThumb = document.getElementById('formImageThumb');
            if (formThumb) {
              formThumb.src = base64;
              formThumb.style.display = 'block';
            }

            renderLivePreview();
            if (elements.btnSaveData) elements.btnSaveData.disabled = false;
            showToast(`เลือกรูปภาพ ${file.name} และฝังลงในข้อมูลสำเร็จ!`, 'success');
          };
          reader.readAsDataURL(file);
        }
      };
      inputElem.click();
    }
  } catch (err) {
    console.error('Image selection error:', err);
    showToast(`เกิดข้อผิดพลาดในการเลือกรูปภาพ: ${err.message}`, 'error');
  } finally {
    setTimeout(() => {
      state.isOpeningImageDialog = false;
    }, 400);
  }
}

function renderEmptyEditor() {
  elements.editorContainer.innerHTML = `
    <div class="select-prompt">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      <h3>${state.records.length > 0 ? 'กรุณาเลือกรายชื่อจากแถบซ้ายมือ' : 'ยังไม่ได้เลือกไฟล์ Excel'}</h3>
      <p>${state.records.length > 0 ? 'เพื่อเริ่มต้นตรวจเช็ก แก้ไขข้อมูล หรือพิมพ์บัตร' : 'คลิกเลือกปุ่มการทำงานด้านล่าง หรือปุ่มด้านบนเพื่อเริ่มสร้างหรือแก้ไขบัตรประจำตัว'}</p>
      
      <div class="empty-editor-actions" style="margin-top: 24px; display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
        <button type="button" class="btn btn-primary" id="btnEmptyOpenExcel" style="padding: 12px 24px; font-size: 14px; cursor: pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
          เลือกไฟล์ Excel (.xlsx)
        </button>
        <button type="button" class="btn btn-secondary" id="btnEmptyCreateTemplate" style="padding: 12px 24px; font-size: 14px; cursor: pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
          สร้างไฟล์แม่แบบใหม่
        </button>
        <button type="button" class="btn btn-secondary" id="btnEmptyAddRecord" style="padding: 12px 24px; font-size: 14px; cursor: pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          + เพิ่มรายชื่อบุคคลใหม่
        </button>
      </div>
    </div>
  `;

  const btnOpen = document.getElementById('btnEmptyOpenExcel');
  if (btnOpen) btnOpen.addEventListener('click', handleOpenExcelDialog);

  const btnCreate = document.getElementById('btnEmptyCreateTemplate');
  if (btnCreate) btnCreate.addEventListener('click', handleCreateExcelTemplate);

  const btnAdd = document.getElementById('btnEmptyAddRecord');
  if (btnAdd) btnAdd.addEventListener('click', addNewRecord);
}

/**
 * ==============================================================================
 * LIVE PREVIEW (VERTICAL THAI ID CARD BADGE)
 * ==============================================================================
 */

function toThaiNumerals(str) {
  if (str === null || str === undefined) return '';
  const thaiDigits = ['๐', '๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘', '๙'];
  return String(str).replace(/[0-9]/g, d => thaiDigits[parseInt(d, 10)]);
}

function renderLivePreview() {
  if (!state.selectedRecord) return;
  const rec = state.selectedRecord;
  const { rankHeader, thaiNameHeader, engRankHeader, engNameHeader, deptHeader, workplaceHeader, startDateHeader, expiryHeader, noteHeader, orderHeader, stripeHeader } = getRankAndNameHeaders();

  // Apply Card Design Theme to Preview
  const currentCardTheme = rec['รูปแบบบัตร'] || state.cardTheme || 'theme-navy-red';
  setCardTheme(currentCardTheme, false);

  // Custom Attached Background Image Rendering
  let customBgUrl = '';
  if (rec._bgImageBase64) {
    customBgUrl = rec._bgImageBase64;
  } else if (state.cardBgImage) {
    customBgUrl = state.cardBgImage;
  } else if (rec['รูปพื้นหลัง']) {
    customBgUrl = formatImageUrl(rec['รูปพื้นหลัง']);
  }

  if (elements.cardCustomBgLayer) {
    if (customBgUrl) {
      elements.cardCustomBgLayer.style.backgroundImage = `url("${customBgUrl}")`;
      elements.cardCustomBgLayer.style.display = 'block';
      if (elements.printableArea) elements.printableArea.classList.add('has-custom-bg');
    } else {
      elements.cardCustomBgLayer.style.backgroundImage = 'none';
      elements.cardCustomBgLayer.style.display = 'none';
      if (elements.printableArea) elements.printableArea.classList.remove('has-custom-bg');
    }
  }

  // Extract Thai Rank & Name
  let rankTh = rankHeader && rec[rankHeader] !== undefined ? String(rec[rankHeader]) : '';
  let nameTh = thaiNameHeader && rec[thaiNameHeader] !== undefined ? String(rec[thaiNameHeader]) : (state.headers[0] ? String(rec[state.headers[0]]) : 'ชื่อนามสกุล');

  if (!rankTh && nameTh) {
    const parsedTh = parseRankAndName(nameTh, false);
    if (parsedTh.rank) {
      rankTh = parsedTh.rank;
      nameTh = parsedTh.name;
    }
  }

  // Convert to Full Thai Rank Name (e.g. นาวาอากาศโท or นาวาอากาศโทหญิง)
  const fullRankTh = getFullRankTh(rankTh, nameTh);

  // Clean nameTh if it starts with "หญิง "
  let cleanNameTh = nameTh;
  if (cleanNameTh.startsWith('หญิง ') && (rankTh || fullRankTh)) {
    cleanNameTh = cleanNameTh.substring(5).trim();
  }

  // Extract English Rank & Name
  let rankEn = engRankHeader && rec[engRankHeader] !== undefined ? String(rec[engRankHeader]) : '';
  let nameEn = engNameHeader && rec[engNameHeader] !== undefined ? String(rec[engNameHeader]) : '';

  if (!rankEn && nameEn) {
    const parsedEn = parseRankAndName(nameEn, true);
    if (parsedEn.rank) {
      rankEn = parsedEn.rank;
      nameEn = parsedEn.name;
    }
  } else if (rankEn && !nameEn) {
    const parsedEn = parseRankAndName(rankEn, true);
    if (parsedEn.name) {
      rankEn = parsedEn.rank;
      nameEn = parsedEn.name;
    }
  }

  // Prevent duplicate English rank prefix
  let cleanNameEn = nameEn;
  if (rankEn && cleanNameEn.toLowerCase().startsWith(rankEn.toLowerCase())) {
    cleanNameEn = cleanNameEn.substring(rankEn.length).trim().replace(/^\./, '').trim();
  }
  const fullEngText = rankEn ? `${rankEn} ${cleanNameEn}`.trim() : cleanNameEn;

  const deptVal = rec[deptHeader || 'แผนก'] !== undefined ? String(rec[deptHeader || 'แผนก']) : '-';
  const workplaceVal = rec[workplaceHeader || 'สถานที่ปฏิบัติงาน'] !== undefined ? String(rec[workplaceHeader || 'สถานที่ปฏิบัติงาน']) : (rec['สถานที่'] !== undefined ? String(rec['สถานที่']) : '');
  const startDateVal = rec[startDateHeader || 'วันที่เริ่มใช้'] !== undefined ? String(rec[startDateHeader || 'วันที่เริ่มใช้']) : (rec['เริ่มใช้'] !== undefined ? String(rec['เริ่มใช้']) : '');
  const expiryVal = rec[expiryHeader || 'วันหมดอายุ'] !== undefined ? String(rec[expiryHeader || 'วันหมดอายุ']) : '-';
  const noteVal = rec[noteHeader || 'หมายเหตุ'] !== undefined ? String(rec[noteHeader || 'หมายเหตุ']) : '';

  const docNumVal = rec['เลขที่ใต้รูป'] !== undefined ? String(rec['เลขที่ใต้รูป']) : (rec['เลขที่'] !== undefined ? String(rec['เลขที่']) : '๑๑/๖๘');
  const roleBannerVal = rec['ข้อความแถบสี'] !== undefined ? String(rec['ข้อความแถบสี']) : (rec['แถบสีเหลือง'] !== undefined ? String(rec['แถบสีเหลือง']) : 'นักศึกษาฝึกงาน');
  const orderVal = rec['ลำดับ'] !== undefined ? String(rec['ลำดับ']) : (rec['ลำดับที่'] !== undefined ? String(rec['ลำดับที่']) : '๑');

  const orgHeader = state.headers.find(h => {
    const l = String(h).toLowerCase();
    return (l.includes('หน่วยงาน') || l.includes('องค์กร') || l.includes('บริษัท') || l.includes('org') || l.includes('agency')) && !isImageHeader(h);
  });
  const orgVal = orgHeader && rec[orgHeader] ? String(rec[orgHeader]) : 'บน.21';

  // Apply to Portrait Elements
  if (elements.cardRank) {
    elements.cardRank.textContent = fullRankTh || '';
    elements.cardRank.style.display = fullRankTh ? 'block' : 'none';
  }
  if (elements.cardThaiFullName) {
    elements.cardThaiFullName.textContent = cleanNameTh || 'ชื่อนามสกุล';
  }
  if (elements.cardEngFullName) {
    elements.cardEngFullName.textContent = fullEngText || '';
    elements.cardEngFullName.style.display = fullEngText ? 'block' : 'none';
  }

  const isLandscape = (currentCardTheme === 'theme-landscape-rtaf');

  if (isLandscape) {
    // === Landscape Mode (Style 3) ===
    if (elements.cardLandscapeOrgTitle) {
      elements.cardLandscapeOrgTitle.textContent = (orgVal && orgVal !== 'บน.21') ? orgVal : 'กองบิน 21';
    }
    if (elements.cardLandscapeFullName) {
      elements.cardLandscapeFullName.textContent = cleanNameTh || 'นายนพกด กินแซ่บ';
    }

    const displayWorkplace = workplaceVal || (deptVal && deptVal !== '-' ? deptVal : 'นหก.สก.ยน');
    if (elements.cardLandscapeWorkplace) {
      elements.cardLandscapeWorkplace.textContent = displayWorkplace;
    }

    let periodText = '';
    if (startDateVal && expiryVal && expiryVal !== '-') {
      periodText = `ฝึกตั้งแต่ ${toThaiNumerals(startDateVal)} ถึง ${toThaiNumerals(expiryVal)}`;
    } else if (expiryVal && expiryVal !== '-') {
      periodText = `ฝึกถึง ${toThaiNumerals(expiryVal)}`;
    } else if (startDateVal) {
      periodText = `ฝึกตั้งแต่ ${toThaiNumerals(startDateVal)}`;
    } else {
      periodText = `ฝึกตั้งแต่ ๑๔ พ.ค. ๖๘ ถึง ๒๓ ส.ค. ๗๐`;
    }
    if (elements.cardLandscapePeriod) {
      elements.cardLandscapePeriod.textContent = periodText;
    }

    if (elements.cardLandscapeDocNumVal) {
      elements.cardLandscapeDocNumVal.textContent = toThaiNumerals(docNumVal);
    }
    if (elements.cardLandscapeRoleBanner) {
      elements.cardLandscapeRoleBanner.textContent = roleBannerVal || 'นักศึกษาฝึกงาน';
    }
    if (elements.cardLandscapeOrderVal) {
      elements.cardLandscapeOrderVal.textContent = toThaiNumerals(orderVal);
    }
  } else {
    // === Vertical Layouts (Styles 1 and 2) ===
    const hasNote = noteVal && String(noteVal).trim() !== '' && String(noteVal).trim() !== '-';
    if (elements.cardNoteVal) {
      if (hasNote) {
        elements.cardNoteVal.textContent = noteVal;
        elements.cardNoteVal.classList.remove('is-empty-placeholder');
      } else {
        elements.cardNoteVal.innerHTML = '<span class="meta-placeholder">(หมายเหตุ)</span>';
        elements.cardNoteVal.classList.add('is-empty-placeholder');
      }
    }
    if (elements.cardNoteLine) elements.cardNoteLine.style.display = 'block';

    const hasDept = deptVal && String(deptVal).trim() !== '' && String(deptVal).trim() !== '-';
    if (elements.cardDeptVal) {
      if (hasDept) {
        elements.cardDeptVal.textContent = deptVal;
        elements.cardDeptVal.classList.remove('is-empty-placeholder');
      } else {
        elements.cardDeptVal.innerHTML = '<span class="meta-placeholder">(แผนก)</span>';
        elements.cardDeptVal.classList.add('is-empty-placeholder');
      }
    }
    if (elements.cardDeptLine) elements.cardDeptLine.style.display = 'block';

    const hasExpiry = expiryVal && String(expiryVal).trim() !== '' && String(expiryVal).trim() !== '-';
    if (elements.cardExpiryVal) {
      if (hasExpiry) {
        elements.cardExpiryVal.textContent = expiryVal;
        elements.cardExpiryVal.classList.remove('is-empty-placeholder');
      } else {
        elements.cardExpiryVal.innerHTML = '<span class="meta-placeholder">-</span>';
        elements.cardExpiryVal.classList.add('is-empty-placeholder');
      }
    }
    if (elements.cardExpiryLine) elements.cardExpiryLine.style.display = 'block';

    if (elements.cardOrgTitle) elements.cardOrgTitle.textContent = orgVal;

    // Left Red Stripe Badge Number: STRICTLY 1 or 2 ONLY (Never sequential row index)
    const rawStripeVal = (stripeHeader && rec[stripeHeader] !== undefined)
      ? String(rec[stripeHeader]).trim()
      : (rec['แถบสี'] !== undefined
        ? String(rec['แถบสี']).trim()
        : (rec['หมายเลขแถบสี'] !== undefined
          ? String(rec['หมายเลขแถบสี']).trim()
          : '1'));

    const isOrder2 = (rawStripeVal === '2');
    const stripeNum = isOrder2 ? '2' : '1';

    if (elements.cardStripeOrderNum) {
      elements.cardStripeOrderNum.textContent = stripeNum;
      elements.cardStripeOrderNum.className = isOrder2 ? 'stripe-order-num order-2' : 'stripe-order-num order-1';
    }
  }

  // Profile Photo
  const imageHeader = state.headers.find(h => isImageHeader(h));
  let imageUrl = '';
  if (state.pendingImageUpload && state.pendingImageUpload.base64) {
    imageUrl = state.pendingImageUpload.base64;
  } else if (rec._imageBase64) {
    imageUrl = rec._imageBase64;
  } else if (state.imageCache && state.imageCache.get(rec._rowIndex)) {
    imageUrl = state.imageCache.get(rec._rowIndex);
  } else if (imageHeader && rec[imageHeader]) {
    imageUrl = formatImageUrl(rec[imageHeader]);
  }

  if (imageUrl) {
    setCroppedAvatarImage(imageUrl);
  } else {
    if (elements.docImagePreview) elements.docImagePreview.style.display = 'none';
    if (elements.docImagePlaceholder) elements.docImagePlaceholder.style.display = 'flex';
    if (elements.docLandscapeImagePreview) elements.docLandscapeImagePreview.style.display = 'none';
    if (elements.docLandscapeImagePlaceholder) elements.docLandscapeImagePlaceholder.style.display = 'flex';
  }

  // Apply custom visual layout positions & sizing
  applyCustomLayoutToDOM();
}

// Smart Portrait Rectangular Auto-Cropper for Profile Photo (Dynamically matches current frame ratio, zero stretch)
function setCroppedAvatarImage(imageUrl) {
  if (!imageUrl) {
    if (elements.docImagePreview) elements.docImagePreview.style.display = 'none';
    if (elements.docImagePlaceholder) elements.docImagePlaceholder.style.display = 'flex';
    if (elements.docLandscapeImagePreview) elements.docLandscapeImagePreview.style.display = 'none';
    if (elements.docLandscapeImagePlaceholder) elements.docLandscapeImagePlaceholder.style.display = 'flex';
    return;
  }

  state.currentRawImageUrl = imageUrl;

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    try {
      const currentTheme = (state.selectedRecord && state.selectedRecord['รูปแบบบัตร']) || state.cardTheme || 'theme-navy-red';
      const isLandscape = (currentTheme === 'theme-landscape-rtaf');

      const photoW = (state.customLayout && state.customLayout.photo && state.customLayout.photo.w) || 125;
      const photoH = (state.customLayout && state.customLayout.photo && state.customLayout.photo.h) || (isLandscape ? 155 : 160);
      const targetRatio = photoW / photoH;
      const currentRatio = img.width / img.height;

      let sx, sy, sWidth, sHeight;
      if (currentRatio > targetRatio) {
        // Image is wider than target frame: crop left/right sides equally
        sHeight = img.height;
        sWidth = img.height * targetRatio;
        sx = (img.width - sWidth) / 2;
        sy = 0;
      } else {
        // Image is taller than target frame: upper focus for face
        sWidth = img.width;
        sHeight = img.width / targetRatio;
        sx = 0;
        sy = Math.max(0, (img.height - sHeight) * 0.12); // gentle upper face bias
      }

      const canvas = document.createElement('canvas');
      canvas.width = Math.round(photoW * 4); // Ultra-crisp 4x resolution (350+ DPI)
      canvas.height = Math.round(photoH * 4);
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Draw cleanly cropped portrait rectangle without any stretching
      ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height);
      const croppedBase64 = canvas.toDataURL('image/png'); // Lossless PNG for razor sharpness

      if (elements.docImagePreview) {
        elements.docImagePreview.src = croppedBase64;
        elements.docImagePreview.style.display = 'block';
      }
      if (elements.docImagePlaceholder) {
        elements.docImagePlaceholder.style.display = 'none';
      }

      if (elements.docLandscapeImagePreview) {
        elements.docLandscapeImagePreview.src = croppedBase64;
        elements.docLandscapeImagePreview.style.display = 'block';
      }
      if (elements.docLandscapeImagePlaceholder) {
        elements.docLandscapeImagePlaceholder.style.display = 'none';
      }
    } catch (e) {
      if (elements.docImagePreview) {
        elements.docImagePreview.src = imageUrl;
        elements.docImagePreview.style.display = 'block';
      }
      if (elements.docImagePlaceholder) {
        elements.docImagePlaceholder.style.display = 'none';
      }
      if (elements.docLandscapeImagePreview) {
        elements.docLandscapeImagePreview.src = imageUrl;
        elements.docLandscapeImagePreview.style.display = 'block';
      }
      if (elements.docLandscapeImagePlaceholder) {
        elements.docLandscapeImagePlaceholder.style.display = 'none';
      }
    }
  };
  img.onerror = () => {
    if (elements.docImagePreview) elements.docImagePreview.style.display = 'none';
    if (elements.docImagePlaceholder) elements.docImagePlaceholder.style.display = 'flex';
    if (elements.docLandscapeImagePreview) elements.docLandscapeImagePreview.style.display = 'none';
    if (elements.docLandscapeImagePlaceholder) elements.docLandscapeImagePlaceholder.style.display = 'flex';
  };
  img.src = imageUrl;
}

/**
 * ==============================================================================
 * CARD SIZE & PRESET TOOLBAR
 * ==============================================================================
 */

function handleCardSizeChange(e) {
  const presetKey = e.target.value;
  state.cardSize.preset = presetKey;

  if (presetKey === 'custom') {
    if (elements.customDimensionsWrapper) elements.customDimensionsWrapper.style.display = 'flex';
    state.cardSize.widthMm = parseFloat(elements.customWidthInput ? elements.customWidthInput.value : 55) || 55;
    state.cardSize.heightMm = parseFloat(elements.customHeightInput ? elements.customHeightInput.value : 85) || 85;
  } else {
    if (elements.customDimensionsWrapper) elements.customDimensionsWrapper.style.display = 'none';
    const preset = CARD_PRESETS[presetKey] || CARD_PRESETS.standard;
    state.cardSize.widthMm = preset.width;
    state.cardSize.heightMm = preset.height;
  }

  applyCardDimensionsUI();
}

function handleCustomDimensionsChange() {
  if (state.cardSize.preset === 'custom') {
    state.cardSize.widthMm = parseFloat(elements.customWidthInput.value) || 55;
    state.cardSize.heightMm = parseFloat(elements.customHeightInput.value) || 85;
    applyCardDimensionsUI();
  }
}

function applyCardDimensionsUI() {
  const isLandscape = (state.cardTheme === 'theme-landscape-rtaf');

  let widthMm, heightMm;
  if (isLandscape) {
    widthMm = 85;
    heightMm = 55;
    state.cardSize.widthMm = 85;
    state.cardSize.heightMm = 55;
    state.cardSize.preset = 'landscape';
    if (elements.cardSizePreset) elements.cardSizePreset.value = 'standard';
    if (elements.customDimensionsWrapper) elements.customDimensionsWrapper.style.display = 'none';
  } else {
    if (state.cardSize.preset === 'custom') {
      widthMm = parseFloat(elements.customWidthInput ? elements.customWidthInput.value : 55) || 55;
      heightMm = parseFloat(elements.customHeightInput ? elements.customHeightInput.value : 85) || 85;
    } else {
      widthMm = 55;
      heightMm = 85;
      state.cardSize.preset = 'standard';
    }
    state.cardSize.widthMm = widthMm;
    state.cardSize.heightMm = heightMm;
  }

  if (elements.cardDimensionsBadge) {
    elements.cardDimensionsBadge.textContent = isLandscape
      ? '85.0 × 55.0 mm (แนวนอน)'
      : `${widthMm.toFixed(1)} × ${heightMm.toFixed(1)} mm (แนวตั้ง)`;
  }

  const cardElem = elements.printableArea;
  if (!cardElem) return;

  if (isLandscape) {
    cardElem.style.width = '556px';
    cardElem.style.height = '360px';
    cardElem.style.minHeight = '360px';
  } else {
    const baseW = 360;
    const currentRatio = heightMm / widthMm;
    const baseH = Math.round(baseW * currentRatio);

    cardElem.style.width = `${baseW}px`;
    cardElem.style.height = `${baseH}px`;
    cardElem.style.minHeight = `${baseH}px`;
  }
}

/**
 * ==============================================================================
 * EXPORT PDF & PNG (HIGH RESOLUTION 300+ DPI)
 * ==============================================================================
 */

async function captureCardCanvas() {
  const cardElem = elements.printableArea;
  if (!cardElem) throw new Error('ไม่พบพื้นที่บัตรสำหรับพิมพ์');

  const isLandscape = cardElem.classList.contains('theme-landscape-rtaf');
  const targetWidth = isLandscape ? 556 : (parseFloat(cardElem.style.width) || 360);
  const targetHeight = isLandscape ? 360 : (parseFloat(cardElem.style.height) || 556);

  const originalTransition = cardElem.style.transition;
  cardElem.style.transition = 'none';

  try {
    const canvas = await window.html2canvas(cardElem, {
      scale: 3.5, // 350+ DPI ultra sharpness
      width: targetWidth,
      height: targetHeight,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      imageTimeout: 0,
      logging: false,
      onclone: (clonedDoc) => {
        const clonedCard = clonedDoc.getElementById('printableArea');
        if (clonedCard) {
          clonedCard.style.boxShadow = 'none';
          clonedCard.style.margin = '0';
          clonedCard.style.width = `${targetWidth}px`;
          clonedCard.style.height = `${targetHeight}px`;
          clonedCard.style.minHeight = `${targetHeight}px`;
          clonedCard.style.maxHeight = `${targetHeight}px`;
          clonedCard.style.overflow = 'hidden';
        }
        // Remove visual-edit-active from body in clone
        if (clonedDoc.body) {
          clonedDoc.body.classList.remove('visual-edit-active');
        }
        // Physically REMOVE all resize handles and inspector DOM nodes from the cloned export tree
        clonedDoc.querySelectorAll('.photo-resize-handle, .logo-resize-handle, #photoResizeHandle, #logoResizeHandle, #landPhotoResizeHandle, #landLogoResizeHandle').forEach(el => {
          el.remove();
        });
        // Clear selection outlines and shadows
        clonedDoc.querySelectorAll('.draggable-card-item').forEach(el => {
          el.style.outline = 'none';
          el.style.boxShadow = 'none';
          el.classList.remove('is-selected', 'is-dragging');
        });
        // Hide faint empty placeholder guides in exported card so export is 100% clean
        clonedDoc.querySelectorAll('.is-empty-placeholder, .meta-placeholder').forEach(el => {
          const parentLine = el.closest('.card-note-line, .card-dept-line, .card-expiry-line');
          if (parentLine) parentLine.style.display = 'none';
        });
      }
    });

    return canvas;
  } finally {
    cardElem.style.transition = originalTransition;
  }
}

async function exportToPDF() {
  switchTab('previewPanel');

  try {
    showToast('กำลังประมวลผลบัตรความละเอียดสูง (300 DPI)...', 'info');

    const isLandscape = elements.printableArea && elements.printableArea.classList.contains('theme-landscape-rtaf');
    const nameStr = isLandscape
      ? (elements.cardLandscapeFullName ? elements.cardLandscapeFullName.textContent : 'IDCard')
      : ((elements.cardThaiFullName && elements.cardThaiFullName.textContent) ? elements.cardThaiFullName.textContent : 'IDCard');
    const cleanName = (nameStr || 'IDCard').replace(/[^a-zA-Z0-9ก-๙_-]/g, '_');
    const defaultFilename = `IDCard_${cleanName}_Row${state.selectedRecord ? state.selectedRecord._rowIndex : '1'}.pdf`;

    const canvas = await captureCardCanvas();
    const imgData = canvas.toDataURL('image/png');

    const pdfWidth = isLandscape ? 85 : 55;
    const pdfHeight = isLandscape ? 55 : 85;

    if (!window.jspdf || !window.jspdf.jsPDF) {
      throw new Error('ไม่สามารถโหลดโมดูล jsPDF ได้');
    }

    const doc = new window.jspdf.jsPDF({
      orientation: isLandscape ? 'landscape' : 'portrait',
      unit: 'mm',
      format: [pdfWidth, pdfHeight],
      compress: true
    });

    doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

    const pdfBase64 = doc.output('datauristring');

    if (window.electronAPI && window.electronAPI.saveFile) {
      const result = await window.electronAPI.saveFile({
        data: pdfBase64,
        defaultFilename,
        filterType: 'pdf'
      });

      if (result.success) {
        showToast('ส่งออกไฟล์ PDF สำเร็จเรียบร้อย!', 'success');
      }
    } else {
      doc.save(defaultFilename);
      showToast('ดาวน์โหลดไฟล์ PDF สำเร็จเรียบร้อย!', 'success');
    }

  } catch (err) {
    console.error(err);
    showToast(`เกิดข้อผิดพลาดในการ Export PDF: ${err.message}`, 'error');
  }
}

async function exportToPNG() {
  switchTab('previewPanel');

  try {
    showToast('กำลังประมวลผลรูปภาพบัตรความละเอียดสูง...', 'info');

    const isLandscape = elements.printableArea && elements.printableArea.classList.contains('theme-landscape-rtaf');
    const nameStr = isLandscape
      ? (elements.cardLandscapeFullName ? elements.cardLandscapeFullName.textContent : 'IDCard')
      : ((elements.cardThaiFullName && elements.cardThaiFullName.textContent) ? elements.cardThaiFullName.textContent : 'IDCard');
    const cleanName = (nameStr || 'IDCard').replace(/[^a-zA-Z0-9ก-๙_-]/g, '_');
    const defaultFilename = `IDCard_${cleanName}_Row${state.selectedRecord ? state.selectedRecord._rowIndex : '1'}.png`;

    const canvas = await captureCardCanvas();
    const pngBase64 = canvas.toDataURL('image/png');

    if (window.electronAPI && window.electronAPI.saveFile) {
      const result = await window.electronAPI.saveFile({
        data: pngBase64,
        defaultFilename,
        filterType: 'png'
      });

      if (result.success) {
        showToast('ส่งออกไฟล์รูปภาพ PNG สำเร็จเรียบร้อย!', 'success');
      }
    } else {
      const link = document.createElement('a');
      link.href = pngBase64;
      link.download = defaultFilename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      showToast('ดาวน์โหลดไฟล์รูปภาพ PNG สำเร็จเรียบร้อย!', 'success');
    }

  } catch (err) {
    console.error(err);
    showToast(`เกิดข้อผิดพลาดในการ Export PNG: ${err.message}`, 'error');
  }
}

/**
 * ==============================================================================
 * UTILITIES & HELPERS
 * ==============================================================================
 */

function switchTab(targetPanelId) {
  elements.tabEditor.classList.toggle('active', targetPanelId === 'editorPanel');
  elements.tabPreview.classList.toggle('active', targetPanelId === 'previewPanel');
  elements.editorPanel.classList.toggle('active', targetPanelId === 'editorPanel');
  elements.previewPanel.classList.toggle('active', targetPanelId === 'previewPanel');

  if (targetPanelId === 'previewPanel') {
    renderLivePreview();
  }
}

function isImageHeader(headerName) {
  if (!headerName) return false;
  const name = String(headerName).toLowerCase();
  return name.includes('รูป') || name.includes('photo') || name.includes('image') || name.includes('picture') || name.includes('avatar') || name.includes('img') || name.includes('ภาพ');
}

// Check if header is an ordering/index column (e.g., ลำดับ, #, No.)
function isOrderHeader(headerName) {
  if (!headerName) return false;
  const name = String(headerName).toLowerCase().trim();
  return name === 'ลำดับ' || name === 'ลำดับที่' || name === 'no' || name === 'no.' || name === '#' || name === 'id' || name === 'seq' || name === 'index' || name === 'order';
}

function formatImageUrl(val) {
  if (!val) return '';
  if (typeof val !== 'string') return String(val);

  if (val.startsWith('data:image')) return val;
  if (val.startsWith('http://') || val.startsWith('https://')) {
    if (val.includes('drive.google.com') || val.includes('open?id=') || val.includes('/file/d/')) {
      const match = val.match(/[?&]id=([a-zA-Z0-9_-]+)/) || val.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return `https://lh3.googleusercontent.com/d/${match[1]}`;
      }
    }
    return val;
  }

  // If it's a relative filename in project
  if (val.endsWith('.png') || val.endsWith('.jpg') || val.endsWith('.jpeg') || val.endsWith('.webp')) {
    if (!val.includes('/') && !val.includes('\\')) {
      return `sample_photos/${val}`;
    }
  }

  return val;
}

function formatDateString(val) {
  if (!val) return '';
  try {
    const d = new Date(val);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  } catch (e) { }
  return String(val);
}

function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/**
 * ==============================================================================
 * VISUAL LAYOUT CUSTOMIZER & DRAG-AND-DROP ENGINE
 * ==============================================================================
 */

const LAYOUT_KEY_LABELS = {
  // Shared
  photo: 'กรอบรูปถ่ายประจำตัว',
  logo: 'ตราสัญลักษณ์ / โลโก้หน่วยงาน',
  orgTitle: 'ชื่อหน่วยงาน (เช่น กองบิน 21)',
  thaiName: 'ชื่อ-นามสกุล (ภาษาไทย)',

  // Portrait Specific
  rank: 'ข้อความยศ (แนวตั้ง)',
  engName: 'ชื่อภาษาอังกฤษ (แนวตั้ง)',
  bottomBlock: 'ข้อมูลมุมขวาล่าง (หมายเหตุ/แผนก/วันหมดอายุ)',
  stripeOrder: 'ตัวเลขลำดับบนแถบสีแดง (1 หรือ 2)',

  // Landscape Specific (Card Style 3)
  docNum: 'เลขที่ใต้รูป (เช่น ๑๑/๖๘)',
  workplace: 'สถานที่ปฏิบัติงาน (เช่น นหก.สก.ยน)',
  period: 'ระยะเวลาการฝึก (ฝึกตั้งแต่...ถึง...)',
  bottomBar: 'แถบสีเหลืองด้านล่าง',
  roleBanner: 'ข้อความบนแถบสีเหลือง (นักศึกษาฝึกงาน)',
  orderBox: 'กล่องลำดับตัวเลขไทย (เช่น ๑ หรือ ๔)'
};

function renderTemplateDropdown() {
  if (!elements.templatePresetSelect) return;
  const currentTheme = (state.selectedRecord && state.selectedRecord['รูปแบบบัตร']) || state.cardTheme || 'theme-navy-red';
  const group = getThemeGroup(currentTheme);

  // Render Builtin Templates for active theme group
  if (elements.optgroupBuiltinTemplates) {
    let builtinsHtml = '';
    Object.keys(BUILTIN_TEMPLATES).forEach(id => {
      const t = BUILTIN_TEMPLATES[id];
      if (t.themeGroup === group) {
        builtinsHtml += `<option value="${escapeHTML(id)}">${escapeHTML(t.name)}</option>`;
      }
    });
    elements.optgroupBuiltinTemplates.innerHTML = builtinsHtml;
  }

  // Render User Saved Templates for active theme group
  const userTemplates = loadSavedTemplates(currentTheme);
  if (elements.optgroupUserTemplates) {
    let html = '';
    const ids = Object.keys(userTemplates);
    if (ids.length === 0) {
      html = '<option value="" disabled>(ยังไม่มีเทมเพลตที่บันทึกไว้)</option>';
    } else {
      ids.forEach(id => {
        const t = userTemplates[id];
        html += `<option value="${escapeHTML(id)}">📁 ${escapeHTML(t.name)}</option>`;
      });
    }
    elements.optgroupUserTemplates.innerHTML = html;
  }

  const defaultId = group === 'landscape' ? 'default_landscape' : 'default_rtaf';
  elements.templatePresetSelect.value = state.selectedTemplateId || defaultId;

  // Show delete button only for custom templates
  if (elements.btnDeleteTemplate) {
    const isCustom = String(elements.templatePresetSelect.value).startsWith('custom_');
    elements.btnDeleteTemplate.style.display = isCustom ? 'inline-flex' : 'none';
  }
}

function handleTemplateSelect(e) {
  const templateId = e.target.value;
  if (!templateId) return;

  state.selectedTemplateId = templateId;
  const currentTheme = (state.selectedRecord && state.selectedRecord['รูปแบบบัตร']) || state.cardTheme || 'theme-navy-red';

  if (BUILTIN_TEMPLATES[templateId]) {
    state.customLayout = JSON.parse(JSON.stringify(BUILTIN_TEMPLATES[templateId].layout));
  } else {
    const userTemplates = loadSavedTemplates(currentTheme);
    if (userTemplates[templateId] && userTemplates[templateId].layout) {
      state.customLayout = JSON.parse(JSON.stringify(userTemplates[templateId].layout));
    }
  }

  saveCustomLayout(currentTheme);
  applyCustomLayoutToDOM();
  renderTemplateDropdown();
  showToast(`โหลดเทมเพลต: ${elements.templatePresetSelect.options[elements.templatePresetSelect.selectedIndex].text}`, 'success');
}

function saveCustomLayout(themeClass) {
  try {
    const currentTheme = themeClass || (state.selectedRecord && state.selectedRecord['รูปแบบบัตร']) || state.cardTheme || 'theme-navy-red';
    const group = getThemeGroup(currentTheme);
    localStorage.setItem(`card_layout_${group}`, JSON.stringify(state.customLayout));
    localStorage.setItem('card_custom_layout', JSON.stringify(state.customLayout));
  } catch (e) {
    console.error('Error saving custom layout:', e);
  }
}

function applyCustomLayoutToDOM() {
  const layout = state.customLayout;
  if (!layout) return;

  const currentTheme = (state.selectedRecord && state.selectedRecord['รูปแบบบัตร']) || state.cardTheme || 'theme-navy-red';
  const isLandscape = (currentTheme === 'theme-landscape-rtaf');

  if (isLandscape) {
    // === 1. Landscape Layout Elements (Card Style 3) ===

    // Photo Frame
    const photoFrame = document.getElementById('cardLandscapeAvatarFrame');
    if (photoFrame && layout.photo) {
      photoFrame.style.transform = `translate(${layout.photo.x || 0}px, ${layout.photo.y || 0}px)`;
      photoFrame.style.width = `${layout.photo.w || 125}px`;
      photoFrame.style.height = `${layout.photo.h || 155}px`;
    }

    // Doc Num Under Photo
    const docNumElem = document.getElementById('cardLandscapeDocNum');
    if (docNumElem && layout.docNum) {
      docNumElem.style.transform = `translate(${layout.docNum.x || 0}px, ${layout.docNum.y || 0}px)`;
      docNumElem.style.fontSize = `${layout.docNum.fontSize || 14}px`;
      docNumElem.style.fontWeight = layout.docNum.fontWeight || '700';
      docNumElem.style.fontStyle = layout.docNum.fontStyle || 'normal';
      docNumElem.style.color = layout.docNum.color || '#000000';
      docNumElem.style.textAlign = layout.docNum.textAlign || 'center';
    }

    // Logo
    const logoWrapper = document.getElementById('cardLandscapeLogoWrapper');
    const logoImg = document.getElementById('cardLandscapeLogoImg');
    if (logoWrapper && layout.logo) {
      logoWrapper.style.transform = `translate(${layout.logo.x || 0}px, ${layout.logo.y || 0}px)`;
      if (layout.logo.w) logoWrapper.style.width = `${layout.logo.w}px`;
      if (layout.logo.h) logoWrapper.style.height = `${layout.logo.h}px`;
    }
    if (logoImg) {
      logoImg.style.maxWidth = '100%';
      logoImg.style.maxHeight = '100%';
      logoImg.style.width = 'auto';
      logoImg.style.height = 'auto';
      logoImg.style.objectFit = 'contain';
    }

    // Org Title (กองบิน 21)
    const orgTitle = document.getElementById('cardLandscapeOrgTitle');
    if (orgTitle && layout.orgTitle) {
      orgTitle.style.transform = `translate(${layout.orgTitle.x || 0}px, ${layout.orgTitle.y || 0}px)`;
      orgTitle.style.fontSize = `${layout.orgTitle.fontSize || 42}px`;
      orgTitle.style.fontWeight = layout.orgTitle.fontWeight || '900';
      orgTitle.style.fontStyle = layout.orgTitle.fontStyle || 'normal';
      orgTitle.style.color = layout.orgTitle.color || '#000000';
      orgTitle.style.textAlign = layout.orgTitle.textAlign || 'left';
    }

    // Thai Name Line
    const thaiNameLine = document.getElementById('cardLandscapeNameLine');
    if (thaiNameLine && layout.thaiName) {
      thaiNameLine.style.transform = `translate(${layout.thaiName.x || 0}px, ${layout.thaiName.y || 0}px)`;
      thaiNameLine.style.fontSize = `${layout.thaiName.fontSize || 22}px`;
      thaiNameLine.style.fontWeight = layout.thaiName.fontWeight || '800';
      thaiNameLine.style.fontStyle = layout.thaiName.fontStyle || 'normal';
      thaiNameLine.style.color = layout.thaiName.color || '#000000';
      thaiNameLine.style.textAlign = layout.thaiName.textAlign || 'left';
    }

    // Workplace Line
    const workplaceLine = document.getElementById('cardLandscapeWorkplaceLine');
    if (workplaceLine && layout.workplace) {
      workplaceLine.style.transform = `translate(${layout.workplace.x || 0}px, ${layout.workplace.y || 0}px)`;
      workplaceLine.style.fontSize = `${layout.workplace.fontSize || 18}px`;
      workplaceLine.style.fontWeight = layout.workplace.fontWeight || '700';
      workplaceLine.style.fontStyle = layout.workplace.fontStyle || 'normal';
      workplaceLine.style.color = layout.workplace.color || '#000000';
      workplaceLine.style.textAlign = layout.workplace.textAlign || 'left';
    }

    // Period Line
    const periodLine = document.getElementById('cardLandscapePeriodLine');
    if (periodLine && layout.period) {
      periodLine.style.transform = `translate(${layout.period.x || 0}px, ${layout.period.y || 0}px)`;
      periodLine.style.fontSize = `${layout.period.fontSize || 16}px`;
      periodLine.style.fontWeight = layout.period.fontWeight || '700';
      periodLine.style.fontStyle = layout.period.fontStyle || 'normal';
      periodLine.style.color = layout.period.color || '#000000';
      periodLine.style.textAlign = layout.period.textAlign || 'left';
    }

    // Bottom Yellow Bar
    const bottomBar = document.getElementById('cardLandscapeBottomBar');
    if (bottomBar && layout.bottomBar) {
      bottomBar.style.transform = `translate(${layout.bottomBar.x || 0}px, ${layout.bottomBar.y || 0}px)`;
    }

    // Role Banner
    const roleBanner = document.getElementById('cardLandscapeRoleBanner');
    if (roleBanner && layout.roleBanner) {
      roleBanner.style.transform = `translate(${layout.roleBanner.x || 0}px, ${layout.roleBanner.y || 0}px)`;
      roleBanner.style.fontSize = `${layout.roleBanner.fontSize || 24}px`;
      roleBanner.style.fontWeight = layout.roleBanner.fontWeight || '800';
      roleBanner.style.fontStyle = layout.roleBanner.fontStyle || 'normal';
      roleBanner.style.color = layout.roleBanner.color || '#000000';
      roleBanner.style.textAlign = layout.roleBanner.textAlign || 'center';
    }

    // Order Box
    const orderBox = document.getElementById('cardLandscapeOrderBox');
    if (orderBox && layout.orderBox) {
      orderBox.style.transform = `translate(${layout.orderBox.x || 0}px, ${layout.orderBox.y || 0}px)`;
      orderBox.style.fontSize = `${layout.orderBox.fontSize || 28}px`;
      orderBox.style.fontWeight = layout.orderBox.fontWeight || '900';
      orderBox.style.fontStyle = layout.orderBox.fontStyle || 'normal';
      orderBox.style.color = layout.orderBox.color || '#000000';
      orderBox.style.textAlign = layout.orderBox.textAlign || 'center';
    }

  } else {
    // === 2. Portrait Layout Elements (Styles 1 and 2) ===

    // Photo Frame
    const photoFrame = document.getElementById('cardAvatarFrame');
    if (photoFrame && layout.photo) {
      photoFrame.style.transform = `translate(${layout.photo.x || 0}px, ${layout.photo.y || 0}px)`;
      photoFrame.style.width = `${layout.photo.w || 125}px`;
      photoFrame.style.height = `${layout.photo.h || 160}px`;
    }

    // Logo
    const logoImg = document.getElementById('cardLogoImg');
    if (logoImg && layout.logo) {
      logoImg.style.transform = `translate(${layout.logo.x || 0}px, ${layout.logo.y || 0}px)`;
      if (layout.logo.w) logoImg.style.width = `${layout.logo.w}px`;
      if (layout.logo.h) logoImg.style.height = `${layout.logo.h}px`;
    }

    // Rank Text
    if (elements.cardRank && layout.rank) {
      elements.cardRank.style.transform = `translate(${layout.rank.x || 0}px, ${layout.rank.y || 0}px)`;
      elements.cardRank.style.fontSize = `${layout.rank.fontSize || 24}px`;
      elements.cardRank.style.fontWeight = layout.rank.fontWeight || '800';
      elements.cardRank.style.fontStyle = layout.rank.fontStyle || 'normal';
      elements.cardRank.style.color = layout.rank.color || '#000000';
      elements.cardRank.style.textAlign = layout.rank.textAlign || 'center';
    }

    // Thai Full Name
    if (elements.cardThaiFullName && layout.thaiName) {
      elements.cardThaiFullName.style.transform = `translate(${layout.thaiName.x || 0}px, ${layout.thaiName.y || 0}px)`;
      elements.cardThaiFullName.style.fontSize = `${layout.thaiName.fontSize || 26}px`;
      elements.cardThaiFullName.style.fontWeight = layout.thaiName.fontWeight || '800';
      elements.cardThaiFullName.style.fontStyle = layout.thaiName.fontStyle || 'normal';
      elements.cardThaiFullName.style.color = layout.thaiName.color || '#000000';
      elements.cardThaiFullName.style.textAlign = layout.thaiName.textAlign || 'center';
    }

    // English Full Name
    if (elements.cardEngFullName && layout.engName) {
      elements.cardEngFullName.style.transform = `translate(${layout.engName.x || 0}px, ${layout.engName.y || 0}px)`;
      elements.cardEngFullName.style.fontSize = `${layout.engName.fontSize || 18}px`;
      elements.cardEngFullName.style.fontWeight = layout.engName.fontWeight || '700';
      elements.cardEngFullName.style.fontStyle = layout.engName.fontStyle || 'normal';
      elements.cardEngFullName.style.color = layout.engName.color || '#000000';
      elements.cardEngFullName.style.textAlign = layout.engName.textAlign || 'center';
    }

    // Bottom Right Block (Note, Dept, Expiry)
    const bottomBlock = document.getElementById('cardBottomRightBlock');
    if (bottomBlock && layout.bottomBlock) {
      bottomBlock.style.transform = `translate(${layout.bottomBlock.x || 0}px, ${layout.bottomBlock.y || 0}px)`;
      bottomBlock.style.fontSize = `${layout.bottomBlock.fontSize || 14}px`;
      bottomBlock.style.textAlign = layout.bottomBlock.textAlign || 'right';

      const lines = bottomBlock.querySelectorAll('.card-note-line, .card-dept-line, .card-expiry-line, .meta-label, .meta-val');
      lines.forEach(l => {
        l.style.fontSize = `${layout.bottomBlock.fontSize || 14}px`;
        l.style.color = layout.bottomBlock.color || '#000000';
        if (layout.bottomBlock.fontStyle) l.style.fontStyle = layout.bottomBlock.fontStyle;
        if (layout.bottomBlock.fontWeight) l.style.fontWeight = layout.bottomBlock.fontWeight;
      });
    }

    // Org Title on Top Header
    if (elements.cardOrgTitle && layout.orgTitle) {
      elements.cardOrgTitle.style.transform = `translate(${layout.orgTitle.x || 0}px, ${layout.orgTitle.y || 0}px)`;
      elements.cardOrgTitle.style.fontSize = `${layout.orgTitle.fontSize || 42}px`;
      elements.cardOrgTitle.style.fontWeight = layout.orgTitle.fontWeight || '800';
      elements.cardOrgTitle.style.fontStyle = layout.orgTitle.fontStyle || 'normal';
      elements.cardOrgTitle.style.color = layout.orgTitle.color || '#ffffff';
      elements.cardOrgTitle.style.textAlign = layout.orgTitle.textAlign || 'center';
    }

    // Stripe Order Badge
    const stripeOrderElem = document.getElementById('cardStripeOrderBadge');
    const stripeOrderNum = document.getElementById('cardStripeOrderNum');
    if (stripeOrderElem && layout.stripeOrder) {
      stripeOrderElem.style.transform = `translate(${layout.stripeOrder.x || 0}px, ${layout.stripeOrder.y || 0}px)`;
      if (stripeOrderNum) {
        stripeOrderNum.style.fontSize = `${layout.stripeOrder.fontSize || 58}px`;
        if (layout.stripeOrder.fontWeight) stripeOrderNum.style.fontWeight = layout.stripeOrder.fontWeight;
        if (layout.stripeOrder.fontStyle) stripeOrderNum.style.fontStyle = layout.stripeOrder.fontStyle;
      }
    }
  }

  // Update Inspector Sliders & Values
  if (elements.photoWidthSlider && layout.photo) {
    elements.photoWidthSlider.value = layout.photo.w || 125;
    if (elements.photoWidthVal) elements.photoWidthVal.textContent = `${layout.photo.w || 125}px`;
  }
  if (elements.photoHeightSlider && layout.photo) {
    elements.photoHeightSlider.value = layout.photo.h || (isLandscape ? 155 : 160);
    if (elements.photoHeightVal) elements.photoHeightVal.textContent = `${layout.photo.h || (isLandscape ? 155 : 160)}px`;
  }
  if (elements.logoWidthSlider && layout.logo) {
    elements.logoWidthSlider.value = layout.logo.w || (isLandscape ? 64 : 85);
    if (elements.logoWidthVal) elements.logoWidthVal.textContent = `${layout.logo.w || (isLandscape ? 64 : 85)}px`;
  }
  if (elements.logoHeightSlider && layout.logo) {
    elements.logoHeightSlider.value = layout.logo.h || (isLandscape ? 76 : 76);
    if (elements.logoHeightVal) elements.logoHeightVal.textContent = `${layout.logo.h || (isLandscape ? 76 : 76)}px`;
  }

  updateInspectorControlsForSelectedKey();
}

function selectLayoutElement(key) {
  state.selectedLayoutKey = key;
  document.querySelectorAll('.draggable-card-item').forEach(el => {
    el.classList.toggle('is-selected', el.getAttribute('data-layout-key') === key);
  });
  updateInspectorControlsForSelectedKey();
}

function updateInspectorControlsForSelectedKey() {
  const key = state.selectedLayoutKey || 'photo';
  const layout = state.customLayout;
  if (!layout) return;

  if (elements.selectedElementLabel) {
    elements.selectedElementLabel.textContent = LAYOUT_KEY_LABELS[key] || key;
  }

  const isPhoto = key === 'photo';
  if (elements.inspectorPhotoSizeGroup) {
    elements.inspectorPhotoSizeGroup.style.display = isPhoto ? 'flex' : 'none';
  }

  const isLogo = key === 'logo';
  if (elements.inspectorLogoSizeGroup) {
    elements.inspectorLogoSizeGroup.style.display = isLogo ? 'flex' : 'none';
    if (layout.logo) {
      if (elements.logoWidthSlider) elements.logoWidthSlider.value = layout.logo.w || 85;
      if (elements.logoWidthVal) elements.logoWidthVal.textContent = `${layout.logo.w || 85}px`;
      if (elements.logoHeightSlider) elements.logoHeightSlider.value = layout.logo.h || 76;
      if (elements.logoHeightVal) elements.logoHeightVal.textContent = `${layout.logo.h || 76}px`;
    }
  }

  const textKeys = ['rank', 'thaiName', 'engName', 'bottomBlock', 'orgTitle', 'stripeOrder', 'docNum', 'workplace', 'period', 'roleBanner', 'orderBox'];
  const isText = textKeys.includes(key);
  if (elements.inspectorFontSizeGroup) {
    elements.inspectorFontSizeGroup.style.display = isText ? 'flex' : 'none';

    if (isText && layout[key]) {
      const item = layout[key];
      if (elements.fontSizeVal) elements.fontSizeVal.textContent = `${item.fontSize || 20}px`;

      // Update Bold toggle active state
      if (elements.btnFontWeightToggle) {
        const isBold = item.fontWeight === '900' || item.fontWeight === '800' || item.fontWeight === '700' || item.fontWeight === 'bold';
        elements.btnFontWeightToggle.classList.toggle('active', isBold);
      }

      // Update Italic toggle active state
      if (elements.btnFontStyleToggle) {
        const isItalic = item.fontStyle === 'italic';
        elements.btnFontStyleToggle.classList.toggle('active', isItalic);
      }

      // Update Color Picker value
      if (elements.textColorPicker && item.color) {
        elements.textColorPicker.value = item.color.startsWith('#') && item.color.length === 7 ? item.color : '#000000';
      }

      // Update Alignment buttons active state
      const align = item.textAlign || (key === 'bottomBlock' ? 'right' : 'center');
      if (elements.btnAlignLeft) elements.btnAlignLeft.classList.toggle('active', align === 'left');
      if (elements.btnAlignCenter) elements.btnAlignCenter.classList.toggle('active', align === 'center');
      if (elements.btnAlignRight) elements.btnAlignRight.classList.toggle('active', align === 'right');
    }
  }
}

function toggleVisualEditMode(forceState = null) {
  const newState = forceState !== null ? forceState : !state.isVisualEditActive;
  state.isVisualEditActive = newState;

  document.body.classList.toggle('visual-edit-active', newState);
  if (elements.visualEditInspector) {
    elements.visualEditInspector.style.display = newState ? 'flex' : 'none';
  }
  if (elements.btnResetLayout) {
    elements.btnResetLayout.style.display = newState ? 'inline-flex' : 'none';
  }
  if (elements.btnToggleVisualEdit) {
    elements.btnToggleVisualEdit.classList.toggle('active', newState);
  }
  if (elements.visualEditText) {
    elements.visualEditText.textContent = newState ? '✓ ปิดโหมดปรับแต่ง' : '🎨 ปรับตำแหน่งอิสระ (Drag & Resize)';
  }

  if (newState) {
    selectLayoutElement(state.selectedLayoutKey || 'photo');
    showToast('เปิดโหมดปรับแต่ง: สามารถใช้เมาส์คลิกลากย้ายตำแหน่ง หรือลากมุมขวาล่างของรูปภาพ/โลโก้เพื่อปรับขนาดได้ทันที', 'info');
  }
}

function resetCustomLayout() {
  const currentTheme = (state.selectedRecord && state.selectedRecord['รูปแบบบัตร']) || state.cardTheme || 'theme-navy-red';
  const group = getThemeGroup(currentTheme);

  if (group === 'landscape') {
    state.customLayout = JSON.parse(JSON.stringify(DEFAULT_LANDSCAPE_LAYOUT));
    state.selectedTemplateId = 'default_landscape';
  } else {
    state.customLayout = JSON.parse(JSON.stringify(DEFAULT_PORTRAIT_LAYOUT));
    state.selectedTemplateId = 'default_rtaf';
  }

  saveCustomLayout(currentTheme);
  applyCustomLayoutToDOM();
  renderTemplateDropdown();
  showToast('รีเซ็ตตำแหน่งและขนาดกลับเป็นค่าเริ่มต้นเรียบร้อยแล้ว', 'success');
}

function initVisualEditEngine() {
  // 1. Template Management Events
  renderTemplateDropdown();

  if (elements.templatePresetSelect) {
    elements.templatePresetSelect.addEventListener('change', handleTemplateSelect);
  }

  if (elements.btnSaveTemplate) {
    elements.btnSaveTemplate.addEventListener('click', () => {
      if (elements.saveTemplateModal) {
        if (elements.templateNameInput) {
          elements.templateNameInput.value = `เทมเพลตของฉัน ${new Date().toLocaleDateString('th-TH')}`;
        }
        elements.saveTemplateModal.style.display = 'flex';
        setTimeout(() => elements.templateNameInput && elements.templateNameInput.focus(), 100);
      }
    });
  }

  if (elements.btnCloseSaveTemplateModal) {
    elements.btnCloseSaveTemplateModal.addEventListener('click', () => {
      if (elements.saveTemplateModal) elements.saveTemplateModal.style.display = 'none';
    });
  }

  if (elements.btnCancelSaveTemplate) {
    elements.btnCancelSaveTemplate.addEventListener('click', () => {
      if (elements.saveTemplateModal) elements.saveTemplateModal.style.display = 'none';
    });
  }

  if (elements.btnConfirmSaveTemplate) {
    elements.btnConfirmSaveTemplate.addEventListener('click', () => {
      const name = elements.templateNameInput ? elements.templateNameInput.value.trim() : '';
      if (!name) {
        showToast('กรุณาระบุชื่อเทมเพลต', 'error');
        return;
      }
      const currentTheme = (state.selectedRecord && state.selectedRecord['รูปแบบบัตร']) || state.cardTheme || 'theme-navy-red';
      const newId = saveUserTemplate(name, state.customLayout, currentTheme);
      state.selectedTemplateId = newId;
      if (elements.saveTemplateModal) elements.saveTemplateModal.style.display = 'none';
      renderTemplateDropdown();
      showToast(`บันทึกเทมเพลต "${name}" เรียบร้อยแล้ว!`, 'success');
    });
  }

  if (elements.btnDeleteTemplate) {
    elements.btnDeleteTemplate.addEventListener('click', () => {
      const currentId = elements.templatePresetSelect ? elements.templatePresetSelect.value : '';
      if (currentId && currentId.startsWith('custom_')) {
        const optText = elements.templatePresetSelect.options[elements.templatePresetSelect.selectedIndex].text;
        if (confirm(`คุณต้องการลบเทมเพลต "${optText}" หรือไม่?`)) {
          const currentTheme = (state.selectedRecord && state.selectedRecord['รูปแบบบัตร']) || state.cardTheme || 'theme-navy-red';
          const group = getThemeGroup(currentTheme);
          deleteUserTemplate(currentId);
          if (group === 'landscape') {
            state.selectedTemplateId = 'default_landscape';
            state.customLayout = JSON.parse(JSON.stringify(DEFAULT_LANDSCAPE_LAYOUT));
          } else {
            state.selectedTemplateId = 'default_rtaf';
            state.customLayout = JSON.parse(JSON.stringify(DEFAULT_PORTRAIT_LAYOUT));
          }
          saveCustomLayout(currentTheme);
          applyCustomLayoutToDOM();
          renderTemplateDropdown();
          showToast('ลบเทมเพลตเรียบร้อยแล้ว', 'info');
        }
      }
    });
  }

  // 2. Toolbar & Visual Mode Events
  if (elements.btnToggleVisualEdit) {
    elements.btnToggleVisualEdit.addEventListener('click', () => toggleVisualEditMode());
  }

  if (elements.btnResetLayout) {
    elements.btnResetLayout.addEventListener('click', resetCustomLayout);
  }

  if (elements.btnCenterElement) {
    elements.btnCenterElement.addEventListener('click', () => {
      const key = state.selectedLayoutKey || 'photo';
      if (state.customLayout[key]) {
        state.customLayout[key].x = 0;
        applyCustomLayoutToDOM();
        saveCustomLayout();
      }
    });
  }

  // 3. Photo Sliders
  if (elements.photoWidthSlider) {
    elements.photoWidthSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (!isNaN(val) && state.customLayout.photo) {
        state.customLayout.photo.w = val;
        applyCustomLayoutToDOM();
        saveCustomLayout();
        if (state.currentRawImageUrl) setCroppedAvatarImage(state.currentRawImageUrl);
      }
    });
  }

  if (elements.photoHeightSlider) {
    elements.photoHeightSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (!isNaN(val) && state.customLayout.photo) {
        state.customLayout.photo.h = val;
        applyCustomLayoutToDOM();
        saveCustomLayout();
        if (state.currentRawImageUrl) setCroppedAvatarImage(state.currentRawImageUrl);
      }
    });
  }

  // 4. Logo Sliders (Width & Height)
  if (elements.logoWidthSlider) {
    elements.logoWidthSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (!isNaN(val)) {
        if (!state.customLayout.logo) state.customLayout.logo = { x: 0, y: 0, w: 85, h: 76 };
        state.customLayout.logo.w = val;
        applyCustomLayoutToDOM();
        saveCustomLayout();
      }
    });
  }

  if (elements.logoHeightSlider) {
    elements.logoHeightSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (!isNaN(val)) {
        if (!state.customLayout.logo) state.customLayout.logo = { x: 0, y: 0, w: 85, h: 76 };
        state.customLayout.logo.h = val;
        applyCustomLayoutToDOM();
        saveCustomLayout();
      }
    });
  }

  // 5. Typography Font Size Inc / Dec
  if (elements.btnFontSizeInc) {
    elements.btnFontSizeInc.addEventListener('click', () => {
      const key = state.selectedLayoutKey;
      if (key && state.customLayout[key] && state.customLayout[key].fontSize !== undefined) {
        state.customLayout[key].fontSize = Math.min(72, (state.customLayout[key].fontSize || 20) + 1);
        applyCustomLayoutToDOM();
        saveCustomLayout();
      }
    });
  }

  if (elements.btnFontSizeDec) {
    elements.btnFontSizeDec.addEventListener('click', () => {
      const key = state.selectedLayoutKey;
      if (key && state.customLayout[key] && state.customLayout[key].fontSize !== undefined) {
        state.customLayout[key].fontSize = Math.max(8, (state.customLayout[key].fontSize || 20) - 1);
        applyCustomLayoutToDOM();
        saveCustomLayout();
      }
    });
  }

  // 6. Font Weight (Bold / Normal) Toggle
  if (elements.btnFontWeightToggle) {
    elements.btnFontWeightToggle.addEventListener('click', () => {
      const key = state.selectedLayoutKey;
      if (key && state.customLayout[key]) {
        const cur = state.customLayout[key].fontWeight;
        const isBold = cur === '900' || cur === '800' || cur === '700' || cur === 'bold';
        state.customLayout[key].fontWeight = isBold ? '400' : '800';
        applyCustomLayoutToDOM();
        saveCustomLayout();
      }
    });
  }

  // 7. Font Style (Italic) Toggle
  if (elements.btnFontStyleToggle) {
    elements.btnFontStyleToggle.addEventListener('click', () => {
      const key = state.selectedLayoutKey;
      if (key && state.customLayout[key]) {
        const cur = state.customLayout[key].fontStyle;
        state.customLayout[key].fontStyle = cur === 'italic' ? 'normal' : 'italic';
        applyCustomLayoutToDOM();
        saveCustomLayout();
      }
    });
  }

  // 8. Text Color Picker
  if (elements.textColorPicker) {
    elements.textColorPicker.addEventListener('input', (e) => {
      const key = state.selectedLayoutKey;
      if (key && state.customLayout[key]) {
        state.customLayout[key].color = e.target.value;
        applyCustomLayoutToDOM();
        saveCustomLayout();
      }
    });
  }

  // 9. Alignment Toggles
  if (elements.btnAlignLeft) {
    elements.btnAlignLeft.addEventListener('click', () => {
      const key = state.selectedLayoutKey;
      if (key && state.customLayout[key]) {
        state.customLayout[key].textAlign = 'left';
        applyCustomLayoutToDOM();
        saveCustomLayout();
      }
    });
  }

  if (elements.btnAlignCenter) {
    elements.btnAlignCenter.addEventListener('click', () => {
      const key = state.selectedLayoutKey;
      if (key && state.customLayout[key]) {
        state.customLayout[key].textAlign = 'center';
        applyCustomLayoutToDOM();
        saveCustomLayout();
      }
    });
  }

  if (elements.btnAlignRight) {
    elements.btnAlignRight.addEventListener('click', () => {
      const key = state.selectedLayoutKey;
      if (key && state.customLayout[key]) {
        state.customLayout[key].textAlign = 'right';
        applyCustomLayoutToDOM();
        saveCustomLayout();
      }
    });
  }

  // 10. Mouse Drag & Resize Interactions
  let isDragging = false;
  let isResizingPhoto = false;
  let isResizingLogo = false;
  let activeDragKey = null;
  let startMouseX = 0;
  let startMouseY = 0;
  let initialElemX = 0;
  let initialElemY = 0;
  let initialPhotoW = 0;
  let initialPhotoH = 0;
  let initialLogoW = 0;
  let initialLogoH = 0;
  let draggedElem = null;

  document.addEventListener('mousedown', (e) => {
    // Check if clicked photo resize handle (portrait or landscape)
    if (e.target.closest('#photoResizeHandle') || e.target.closest('#landPhotoResizeHandle')) {
      e.preventDefault();
      e.stopPropagation();
      isResizingPhoto = true;
      startMouseX = e.clientX;
      startMouseY = e.clientY;
      initialPhotoW = (state.customLayout.photo && state.customLayout.photo.w) || 125;
      initialPhotoH = (state.customLayout.photo && state.customLayout.photo.h) || 155;
      selectLayoutElement('photo');
      return;
    }

    // Check if clicked logo resize handle (portrait or landscape)
    if (e.target.closest('#logoResizeHandle') || e.target.closest('#landLogoResizeHandle')) {
      e.preventDefault();
      e.stopPropagation();
      isResizingLogo = true;
      startMouseX = e.clientX;
      startMouseY = e.clientY;
      initialLogoW = (state.customLayout.logo && state.customLayout.logo.w) || 64;
      initialLogoH = (state.customLayout.logo && state.customLayout.logo.h) || 76;
      selectLayoutElement('logo');
      return;
    }

    const item = e.target.closest('.draggable-card-item');
    if (!item) return;

    const key = item.getAttribute('data-layout-key');
    if (!key) return;

    selectLayoutElement(key);

    // If visual edit mode is active, begin drag
    if (state.isVisualEditActive) {
      e.preventDefault();
      isDragging = true;
      activeDragKey = key;
      draggedElem = item;
      startMouseX = e.clientX;
      startMouseY = e.clientY;
      initialElemX = (state.customLayout[key] && state.customLayout[key].x) || 0;
      initialElemY = (state.customLayout[key] && state.customLayout[key].y) || 0;
      item.classList.add('is-dragging');
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (isResizingPhoto) {
      const deltaX = e.clientX - startMouseX;
      const deltaY = e.clientY - startMouseY;
      const newW = Math.max(60, Math.min(260, initialPhotoW + deltaX));
      const newH = Math.max(70, Math.min(280, initialPhotoH + deltaY));
      if (!state.customLayout.photo) state.customLayout.photo = { x: 0, y: 0, w: 125, h: 155 };
      state.customLayout.photo.w = newW;
      state.customLayout.photo.h = newH;
      applyCustomLayoutToDOM();
      return;
    }

    if (isResizingLogo) {
      const deltaX = e.clientX - startMouseX;
      const deltaY = e.clientY - startMouseY;
      const newW = Math.max(25, Math.min(200, initialLogoW + deltaX));
      const newH = Math.max(25, Math.min(180, initialLogoH + deltaY));
      if (!state.customLayout.logo) state.customLayout.logo = { x: 0, y: 0, w: 64, h: 76 };
      state.customLayout.logo.w = newW;
      state.customLayout.logo.h = newH;
      applyCustomLayoutToDOM();
      return;
    }

    if (isDragging && activeDragKey) {
      const deltaX = e.clientX - startMouseX;
      const deltaY = e.clientY - startMouseY;
      if (!state.customLayout[activeDragKey]) {
        state.customLayout[activeDragKey] = { x: 0, y: 0 };
      }
      state.customLayout[activeDragKey].x = initialElemX + deltaX;
      state.customLayout[activeDragKey].y = initialElemY + deltaY;
      applyCustomLayoutToDOM();
    }
  });

  window.addEventListener('mouseup', () => {
    const wasResizingPhoto = isResizingPhoto;
    if (isDragging || isResizingPhoto || isResizingLogo) {
      isDragging = false;
      isResizingPhoto = false;
      isResizingLogo = false;
      if (draggedElem) {
        draggedElem.classList.remove('is-dragging');
        draggedElem = null;
      }
      activeDragKey = null;
      saveCustomLayout();
      if (wasResizingPhoto && state.currentRawImageUrl) {
        setCroppedAvatarImage(state.currentRawImageUrl);
      }
    }
  });

  // Apply initially saved layout
  applyCustomLayoutToDOM();
}
