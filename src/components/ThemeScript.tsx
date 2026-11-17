/*
 * Picks the theme before the first paint: a ?theme= link wins, then what
 * this browser chose last, then paper. Only ever sets data-theme on <html>.
 */
export const THEMES = [
  { id: 'paper', name: 'Paper' },
  { id: 'deck', name: 'Deck' },
] as const
export const THEME_KEY = 'jb-portfolio:theme'

export function ThemeScript() {
  const ids = JSON.stringify(THEMES.map((t) => t.id))
  const js = `(function(){try{var ok=${ids},q=new URLSearchParams(location.search).get('theme');var t=ok.indexOf(q)>-1?q:localStorage.getItem('${THEME_KEY}');if(ok.indexOf(t)<0)t='paper';document.documentElement.dataset.theme=t}catch(e){}})()`
  return <script dangerouslySetInnerHTML={{ __html: js }} />
}
