import Color from 'color'

import { Platform } from 'react-native'

const baseTheme = {
  // Scene
  sceneBgColor: 'white',

  // Line
  lineColor: '#979797',

  // Badge
  badgeBg: '#ED1727',
  badgeColor: '#fff',

  // Button
  btnFontFamily: (Platform.OS === 'ios' ) ? 'HelveticaNeue' : 'Roboto_medium',
  btnDisabledBg: '#b5b5b5',
  btnDisabledClr: '#f1f1f1',
  buttonPadding: 6,

  // Card
  cardDefaultBg: '#fff',

  // Check Box
  checkboxBgColor: '#039BE5',
  checkboxSize: 23,
  checkboxTickColor: '#fff',

  // Color
  brandPrimary : '#4169e1',
  brandInfo: '#5bc0de',
  brandSuccess: '#5cb85c',
  brandDanger: '#d9534f',
  brandWarning: '#f0ad4e',
  brandSidebar: '#252932',

  // Font
  fontFamily: (Platform.OS === 'ios' ) ? 'HelveticaNeue' : 'Roboto',
  fontSizeBase: 15,

  // Footer
  footerHeight: 55,
  footerDefaultBg: (Platform.OS === 'ios' ) ? '#F8F8F8' : '#4179F7',

  //FooterTab
  tabBarTextColor: (Platform.OS === 'ios' ) ? '#6b6b6b' : '#b3c7f9',
  tabBarActiveTextColor: (Platform.OS === 'ios' ) ? '#007aff' : '#fff',
  tabActiveBgColor: (Platform.OS=='ios') ? '#cde1f9' : undefined,

  // Header
  iosToolbarBtnColor: '#007aff',
  toolbarDefaultBg: (Platform.OS === 'ios' ) ? '#F8F8F8' : '#4179F7',
  toolbarHeight: (Platform.OS === 'ios' ) ? 64 : 56,
  toolbarIconSize: (Platform.OS === 'ios' ) ? 20 : 22,
  toolbarInputColor: '#CECDD2',
  toolbarInverseBg: '#222',
  toolbarTextColor: (Platform.OS==='ios') ? '#000' : '#fff',

  // Icon
  iconFamily: 'Ionicons',
  iconFontSize: (Platform.OS === 'ios' ) ? 30 : 28,
  iconMargin: 7,

  // InputGroup
  inputFontSize: 15,
  inputBorderColor: 'skyblue',
  inputSuccessBorderColor: '#2b8339',
  inputErrorBorderColor: '#ed2f2f',

  inputGroupMarginBottom: 10,
  inputHeightBase: 40,
  inputPaddingLeft: 5,

  // Line Height
  btnLineHeight: 19,
  lineHeightH1: 32,
  lineHeightH2: 27,
  lineHeightH3: 22,
  iconLineHeight: (Platform.OS === 'ios' ) ? 37 : 30,
  lineHeight: (Platform.OS === 'ios' ) ? 20 : 24,

  // List
  listBorderColor: '#ddd',
  listDividerBg: '#ddd',
  listItemHeight: 45,
  listItemPadding: (Platform.OS === 'ios' ) ? 12 : 16,
  listNoteColor: '#808080',
  listNoteSize: 13,

  // Progress Bar
  defaultProgressColor: '#E4202D',
  inverseProgressColor: '#1A191B',

  // Radio Button
  radioBtnSize: (Platform.OS === 'ios') ? 25 : 23,
  radioColor: '#7e7e7e',

  // Spinner
  defaultSpinnerColor: '#45D56E',
  inverseSpinnerColor: '#1A191B',

  // Tabs
  tabBgColor: '#F8F8F8',
  tabFontSize: 15,
  tabTextColor: '#222222',

  // Text
  textColor: '#000',
  inverseTextColor: '#fff',

  // Title
  titleFontSize: (Platform.OS === 'ios' ) ? 17 : 19,
  subTitleFontSize: (Platform.OS === 'ios' ) ? 12 : 14,
  subtitleColor: '#8e8e93',

  // Other
  borderRadiusBase: (Platform.OS === 'ios' ) ? 5 : 2,
  borderWidth: 1,
  contentPadding: 10,

  dropdownBg: '#000',
  dropdownLinkColor: '#414142',
  inputLineHeight: 24,
  jumbotronBg: '#C9C9CE',
  jumbotronPadding: 30
}

const fullTheme = Object.assign({}, baseTheme, {
  btnPrimaryBg          : baseTheme.brandPrimary,
  btnPrimaryColor       : baseTheme.inverseTextColor,
  btnInfoBg             : baseTheme.brandInfo,
  btnInfoColor          : baseTheme.inverseTextColor,
  btnSuccessBg          : baseTheme.brandSuccess,
  btnSuccessColor       : baseTheme.inverseTextColor,
  btnDangerBg           : baseTheme.brandDanger,
  btnDangerColor        : baseTheme.inverseTextColor,
  btnWarningBg          : baseTheme.brandWarning,
  btnWarningColor       : baseTheme.inverseTextColor,
  btnTextSize           : (Platform.OS === 'ios') ? baseTheme.fontSizeBase * 1.1 : baseTheme.fontSizeBase - 1,
  btnTextSizeLarge      : baseTheme.fontSizeBase * 1.5,
  btnTextSizeSmall      : baseTheme.fontSizeBase * .8,
  borderRadiusLarge     : baseTheme.fontSizeBase * 3.8,
  iconSizeLarge         : baseTheme.iconFontSize * 1.5,
  iconSizeSmall         : baseTheme.iconFontSize * .6,
  fontSizeH1            : baseTheme.fontSizeBase * 1.8,
  fontSizeH2            : baseTheme.fontSizeBase * 1.6,
  fontSizeH3            : baseTheme.fontSizeBase * 1.4,
  statusBarColor        : Color(baseTheme.toolbarDefaultBg).darken(0.2).hexString(),
  inputColor            : baseTheme.textColor,
  inputColorPlaceholder : '#575757',
  inputPaddingLeftIcon  : baseTheme.inputPaddingLeft * 8,
  radioSelectedColor    : Color(baseTheme.radioColor).darken(0.2).hexString(),
  darkenHeader          : Color(baseTheme.tabBgColor).darken(0.03).hexString()
})

export default fullTheme

