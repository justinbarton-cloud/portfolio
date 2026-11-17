import { DEFAULT_THEME, themeCss, themes } from '../../content/themes'

/*
 * The tokens as a stylesheet, and the few lines that pick a theme and a mode
 * before the first paint, so a dark page never flashes light. A shared link
 * (?theme=, ?mode=) wins, then this browser's last choice, then the defaults.
 * Mode "auto" follows the system, except in a theme that's dark by nature.
 * It only ever sets data-theme and data-mode on <html>.
 */
export const THEME_KEY = 'jb-portfolio:theme'
export const MODE_KEY = 'jb-portfolio:mode'

export function ThemeScript() {
  const darkByNature = JSON.stringify(Object.fromEntries(themes.map((t) => [t.id, t.defaultMode === 'dark'])))
  const js = `(function(){try{var D=${darkByNature},d=document.documentElement,q=new URLSearchParams(location.search);
var t=q.get('theme');if(!(t in D)){t=localStorage.getItem('${THEME_KEY}');if(!(t in D))t='${DEFAULT_THEME}'}
var m=q.get('mode')||localStorage.getItem('${MODE_KEY}')||'auto';
var r=m==='light'||m==='dark'?m:(D[t]||matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
d.dataset.theme=t;d.dataset.mode=r;d.dataset.modePref=m}catch(e){}})()`
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: themeCss() }} />
      <script dangerouslySetInnerHTML={{ __html: js }} />
    </>
  )
}
