export default function SceneArt({ src, alt, eyebrow }) {
  return <div className="scene-art" role="img" aria-label={alt} style={{ '--scene-image': `url("${src}")` }}><div className="art-fallback"><span>{eyebrow}</span><b>DESTINY<br /><em>LINE</em></b><i>✦</i></div><div className="art-overlay" /></div>;
}
