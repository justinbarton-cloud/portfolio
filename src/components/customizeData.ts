import { themes } from '../../content/themes'

/** The themes, as plain data for the client. No module with logic ships to the browser. */
export const customizeThemes = () => themes
export type CustomizeTheme = ReturnType<typeof customizeThemes>[number]
