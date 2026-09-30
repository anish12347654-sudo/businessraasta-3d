import{_ as e,f as t,m as n,o as r}from"./index-BKvbBODG.js";import{At as i,C as a,E as o,Et as s,_ as c,ht as l,k as u,m as d,u as f,w as p,xt as m}from"./events-9ce18a08.esm-K6XmI2oG.js";import{r as h}from"./MapPin-mX9Oay5F.js";var g=new i(0,1,0),_=3.2;function v(e,t=10,n=12,a=7){let o=r(e),s=[],c=o()*Math.PI*2;for(let e=0;e<t;e++){let t=e<2?e*.15:Math.sin(c+e*.85)*(.55+o()*.45);s.push(new i(t*a,0,8-e*n))}return s}function y({seed:e,controlPoints:t=10,samples:n=240,width:r=3.2,spacing:s=12,swing:c=7}){let l=new o(v(e,t,s,c),!1,`centripetal`),u=l.getSpacedPoints(n),d=n+1,f=new Float32Array(d*2*3),m=new Float32Array(d*2*2),h=new Uint32Array(n*6),_=new i,y=new i,b=r/2;for(let e=0;e<d;e++){let t=e/n,r=u[e];l.getTangentAt(t,_),y.crossVectors(_,g).normalize();let i=e*6;f[i]=r.x-y.x*b,f[i+1]=r.y,f[i+2]=r.z-y.z*b,f[i+3]=r.x+y.x*b,f[i+4]=r.y,f[i+5]=r.z+y.z*b;let a=e*4;m[a]=0,m[a+1]=t,m[a+2]=1,m[a+3]=t}for(let e=0;e<n;e++){let t=e*2,n=t+1,r=t+2,i=t+3;h.set([t,n,r,n,i,r],e*6)}let x=new p;return x.setAttribute(`position`,new a(f,3)),x.setAttribute(`uv`,new a(m,2)),x.setIndex(new a(h,1)),x.computeVertexNormals(),x.computeBoundingSphere(),{curve:l,geometry:x,width:r,length:l.getLength()}}function b(e,t,n){let r=1/0;for(let i of n){let n=i.x-e,a=i.z-t,o=n*n+a*a;o<r&&(r=o)}return r}var x=`
  #include <common>
  #include <fog_pars_vertex>
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }
`,S=`
  uniform float uTime;
  uniform float uReveal;
  uniform vec3 uGlow;
  uniform vec3 uDash;
  uniform vec3 uAsphalt;
  varying vec2 vUv;
  #include <common>
  #include <fog_pars_fragment>

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  void main() {
    if (vUv.y > uReveal) discard;
    float x = vUv.x;
    float ex = min(x, 1.0 - x);

    // Asphalt with a faint grain and a soft sheen down the middle.
    vec3 col = uAsphalt * (0.92 + 0.16 * hash21(floor(vUv * vec2(48.0, 1400.0))));
    col += uGlow * 0.035 * (1.0 - abs(x - 0.5) * 2.0);

    // Orange edge glow: soft spill plus a crisp neon kerb line.
    float spill = smoothstep(0.22, 0.0, ex);
    float kerb = smoothstep(0.03, 0.0, abs(ex - 0.045));
    col = mix(col, uGlow * 0.55, spill * 0.55);
    col += uGlow * kerb * 1.6;

    // Animated centre dashes.
    float dash = step(0.5, fract(vUv.y * 60.0 - uTime * 0.6)) * step(abs(x - 0.5), 0.03);
    col = mix(col, uDash * 1.35, dash);

    // Bright leading edge while the road draws itself.
    float front = smoothstep(0.035, 0.0, uReveal - vUv.y) * step(uReveal, 0.999);
    col += mix(uGlow, uDash, 0.5) * front * 2.2;

    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
  }
`,C=`
  uniform float uReveal;
  uniform float uInner;
  uniform vec3 uGlow;
  varying vec2 vUv;
  #include <common>
  #include <fog_pars_fragment>
  void main() {
    if (vUv.y > uReveal) discard;
    float d = abs(vUv.x - 0.5) * 2.0;          // 0 centre .. 1 outer edge of the halo ribbon
    float a = pow(smoothstep(1.0, uInner, d), 2.0) * smoothstep(uInner - 0.08, uInner, d);
    #ifdef USE_FOG
      a *= 1.0 - smoothstep(fogNear, fogFar, vFogDepth);   // additive: fade out instead of tinting
    #endif
    gl_FragColor = vec4(uGlow * a * 0.38, 1.0);
    #include <colorspace_fragment>
  }
`;function w({glow:e=`#F07818`,dash:t=`#FFB36B`,asphalt:n=`#0F172A`}={}){return new l({uniforms:s.merge([c.fog,{uTime:{value:0},uReveal:{value:0},uGlow:{value:new u(e)},uDash:{value:new u(t)},uAsphalt:{value:new u(n)}}]),vertexShader:x,fragmentShader:S,fog:!0})}function T({glow:e=`#F07818`,inner:t=.5}={}){return new l({uniforms:s.merge([c.fog,{uReveal:{value:0},uInner:{value:t},uGlow:{value:new u(e)}}]),vertexShader:x,fragmentShader:C,fog:!0,transparent:!0,depthWrite:!1,blending:2})}var E=`
  attribute float aRand;
  attribute float aNear;
  varying vec3 vLocal;
  varying vec3 vScale;
  varying vec3 vN;
  varying vec2 vFace;
  varying float vFaceSeed;
  varying float vRand;
  varying float vNear;
  #include <common>
  #include <fog_pars_vertex>
  void main() {
    #ifdef USE_INSTANCING
      mat4 im = instanceMatrix;
    #else
      mat4 im = mat4(1.0);
    #endif
    vec3 sc = vec3(length(im[0].xyz), length(im[1].xyz), length(im[2].xyz));
    vec3 lp = position * sc;
    vLocal = lp;
    vScale = sc;
    vN = normal;
    vFace = abs(normal.x) > 0.5 ? vec2(lp.z, lp.y) : vec2(lp.x, lp.y);
    vFaceSeed = dot(normal, vec3(3.0, 7.0, 13.0));
    vRand = aRand;
    vNear = aNear;
    vec4 mvPosition = modelViewMatrix * im * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }
`,D=`
  uniform float uTime;
  uniform vec3 uBase;
  uniform vec3 uTop;
  uniform vec3 uWarm;
  uniform vec3 uAmber;
  uniform vec3 uCool;
  uniform vec3 uRim;
  uniform vec3 uGlow;
  varying vec3 vLocal;
  varying vec3 vScale;
  varying vec3 vN;
  varying vec2 vFace;
  varying float vFaceSeed;
  varying float vRand;
  varying float vNear;
  #include <common>
  #include <fog_pars_fragment>

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  void main() {
    float h01 = clamp(vLocal.y / vScale.y, 0.0, 1.0);
    vec3 wall = mix(uBase, uTop, h01);
    float shade = vN.y > 0.5 ? 1.2 : (abs(vN.x) > 0.5 ? 0.72 : 1.0);
    vec3 col = wall * shade;
    float glow = 0.0;

    // Procedural windows: a 2.2 x 3.0 per-unit grid on each wall. When a window cell shrinks
    // below ~2px it is replaced by its average colour (kills distance moiré).
    vec2 cell = vFace * vec2(2.2, 3.0);
    vec2 fw = fwidth(cell);
    float farMix = smoothstep(0.28, 0.6, max(fw.x, fw.y));

    if (vN.y < 0.5) {
      vec2 id = floor(cell);
      vec2 f = fract(cell);
      float pane = step(0.2, f.x) * step(f.x, 0.8) * step(0.24, f.y) * step(f.y, 0.76);
      float faceW = abs(vN.x) > 0.5 ? vScale.z : vScale.x;
      float inside = step(0.3, vLocal.y) * step(vLocal.y, vScale.y - 0.2) * step(abs(vFace.x), faceW * 0.5 - 0.1);
      // Quantise the interpolated per-instance/per-face seeds: the hash is chaotic, so tiny
      // interpolation differences would otherwise turn every window into per-pixel noise.
      vec2 seed = vec2(floor(vRand * 97.0 + 0.5) * 1.7, floor(vFaceSeed + 20.5) * 3.1);
      float h = hash21(id + seed);
      float lit = step(0.6, h);
      // A few windows switch on/off every few seconds; the rest flicker gently.
      float blink = step(0.975, hash21(id * 1.37 + seed + floor(uTime * 0.22 + h * 9.0)));
      lit = abs(lit - blink);
      float flicker = 0.84 + 0.16 * sin(uTime * (0.35 + h * 1.4) + h * 60.0);
      vec3 wc = h > 0.94 ? uCool : mix(uWarm, uAmber, fract(h * 7.31));
      float win = pane * inside;
      vec3 dark = col * 0.5 + vec3(0.012, 0.03, 0.07);
      vec3 nearCol = mix(col, dark, win * (1.0 - lit));
      nearCol = mix(nearCol, wc * flicker * 1.25, win * lit);
      vec3 avg = mix(col, mix(dark, mix(uWarm, uAmber, 0.5) * 1.1, 0.4), 0.36 * inside);
      col = mix(nearCol, avg, farMix);
      glow = mix(win * lit, 0.15 * inside, farMix);
      // Warm spill from the road on the lower floors of road-side buildings.
      col += uGlow * 0.26 * vNear * (1.0 - smoothstep(0.0, 1.8, vLocal.y)) * (1.0 - glow);
      // Faint cool rim at the top of every wall.
      col += uRim * 0.35 * smoothstep(vScale.y - 0.1, vScale.y, vLocal.y);
    } else {
      float edge = min(0.5 * vScale.x - abs(vLocal.x), 0.5 * vScale.z - abs(vLocal.z));
      col = mix(col, uRim, smoothstep(0.1, 0.0, edge) * 0.5);
    }

    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #ifdef USE_FOG
      float fogF = smoothstep(fogNear, fogFar, vFogDepth);
      fogF *= 1.0 - 0.5 * glow;   // lit windows punch through the haze
      gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, fogF);
    #endif
  }
`;function O(){return new l({uniforms:s.merge([c.fog,{uTime:{value:0},uBase:{value:new u(`#0B2E5E`).multiplyScalar(.4)},uTop:{value:new u(`#123B73`).multiplyScalar(.75)},uWarm:{value:new u(`#FFB36B`)},uAmber:{value:new u(`#F59F0A`)},uCool:{value:new u(`#BFD8FF`)},uRim:{value:new u(`#3B82F6`)},uGlow:{value:new u(`#F07818`)}}]),vertexShader:E,fragmentShader:D,fog:!0})}var k=`
  varying vec3 vWorld;
  #include <common>
  #include <fog_pars_vertex>
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    vec4 mvPosition = viewMatrix * world;
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }
`,A=`
  uniform vec3 uColor;
  uniform vec3 uLine;
  varying vec3 vWorld;
  #include <common>
  #include <fog_pars_fragment>
  void main() {
    vec2 g = abs(fract(vWorld.xz / 3.0 - 0.5) - 0.5) / fwidth(vWorld.xz / 3.0);
    float line = 1.0 - min(min(g.x, g.y), 1.0);
    vec3 col = uColor + uLine * line * 0.22;
    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
    #include <fog_fragment>
  }
`;function j(){return new l({uniforms:s.merge([c.fog,{uColor:{value:new u(`#081A38`)},uLine:{value:new u(`#3B82F6`)}}]),vertexShader:k,fragmentShader:A,fog:!0})}var M=e(n(),1),N=t(),P=`
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aSeed;
  varying float vSeed;
  varying float vFade;
  #include <common>
  #include <fog_pars_vertex>
  void main() {
    vec3 p = position;
    float s = aSeed * 6.2831;
    p.x += sin(uTime * 0.35 + s) * 0.6;
    p.y += sin(uTime * 0.5 + s * 1.7) * 0.35;
    p.z += cos(uTime * 0.3 + s * 0.8) * 0.6;
    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = uSize * uPixelRatio * (0.5 + aSeed) * (12.0 / -mvPosition.z);
    vSeed = aSeed;
    vFade = smoothstep(0.5, 3.0, -mvPosition.z);
    #include <fog_vertex>
  }
`,F=`
  uniform float uTime;
  uniform vec3 uWarm;
  uniform vec3 uCool;
  varying float vSeed;
  varying float vFade;
  #include <common>
  #include <fog_pars_fragment>
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a *= a;
    float tw = 0.55 + 0.45 * sin(uTime * (1.0 + vSeed * 2.0) + vSeed * 40.0);
    vec3 col = mix(uWarm, uCool, step(0.82, vSeed));
    a *= tw * vFade;
    #ifdef USE_FOG
      a *= 1.0 - smoothstep(fogNear, fogFar, vFogDepth);
    #endif
    gl_FragColor = vec4(col * a, 1.0);
    #include <colorspace_fragment>
  }
`,I=`
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aSeed;
  varying float vA;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = (1.0 + aSeed * 2.2) * uPixelRatio;
    vA = (0.35 + 0.65 * aSeed) * (0.6 + 0.4 * sin(uTime * (0.6 + aSeed) + aSeed * 90.0));
  }
`,L=`
  varying float vA;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.1, d) * vA;
    gl_FragColor = vec4(vec3(0.78, 0.86, 1.0) * a, 1.0);
    #include <colorspace_fragment>
  }
`;function R({curve:e,count:t}){let n=d(e=>e.viewport.dpr),o=(0,M.useMemo)(()=>{let n=r(21),o=new Float32Array(t*3),s=new Float32Array(t),c=new i;for(let r=0;r<t;r++)e.getPointAt(n(),c),o[r*3]=c.x+(n()-.5)*26,o[r*3+1]=.3+n()**1.8*7,o[r*3+2]=c.z+(n()-.5)*8,s[r]=n();let l=new p;return l.setAttribute(`position`,new a(o,3)),l.setAttribute(`aSeed`,new a(s,1)),l},[e,t]),m=(0,M.useMemo)(()=>new l({uniforms:s.merge([c.fog,{uTime:{value:0},uSize:{value:9},uPixelRatio:{value:1},uWarm:{value:new u(`#FFB36B`)},uCool:{value:new u(`#8FB8FF`)}}]),vertexShader:P,fragmentShader:F,fog:!0,transparent:!0,depthWrite:!1,blending:2}),[]);return m.uniforms.uPixelRatio.value=n,(0,M.useEffect)(()=>()=>{o.dispose(),m.dispose()},[o,m]),f(e=>{m.uniforms.uTime.value=e.clock.elapsedTime}),t?(0,N.jsx)(`points`,{geometry:o,material:m,frustumCulled:!1}):null}function z({count:e}){let t=(0,M.useRef)(null),n=d(e=>e.viewport.dpr),i=(0,M.useMemo)(()=>{let t=r(5),n=new Float32Array(e*3),i=new Float32Array(e);for(let r=0;r<e;r++){let e=t()*Math.PI*2,a=Math.asin(.06+t()*.9);n[r*3]=Math.cos(e)*Math.cos(a)*180,n[r*3+1]=Math.sin(a)*180,n[r*3+2]=Math.sin(e)*Math.cos(a)*180,i[r]=t()**3}let o=new p;return o.setAttribute(`position`,new a(n,3)),o.setAttribute(`aSeed`,new a(i,1)),o},[e]),o=(0,M.useMemo)(()=>new l({uniforms:{uTime:{value:0},uPixelRatio:{value:1}},vertexShader:I,fragmentShader:L,transparent:!0,depthWrite:!1,blending:2}),[]);return o.uniforms.uPixelRatio.value=n,(0,M.useEffect)(()=>()=>{i.dispose(),o.dispose()},[i,o]),f(e=>{o.uniforms.uTime.value=e.clock.elapsedTime,t.current?.position.copy(e.camera.position)}),e?(0,N.jsx)(`points`,{ref:t,geometry:i,material:o,frustumCulled:!1,renderOrder:-1}):null}function B({at:e}){let t=(0,M.useMemo)(()=>({blue:new m({map:h(),color:`#3B82F6`,opacity:.55,transparent:!0,depthWrite:!1,blending:2,fog:!1,toneMapped:!1}),warm:new m({map:h(),color:`#F07818`,opacity:.35,transparent:!0,depthWrite:!1,blending:2,fog:!1,toneMapped:!1})}),[]);return(0,M.useEffect)(()=>()=>{t.blue.dispose(),t.warm.dispose()},[t]),(0,N.jsxs)(`group`,{position:[e.x,e.y,e.z],children:[(0,N.jsx)(`sprite`,{material:t.blue,scale:[240,60,1],position:[0,4,-20]}),(0,N.jsx)(`sprite`,{material:t.warm,scale:[90,26,1],position:[0,1,-10]})]})}export{j as a,_ as c,O as i,y as l,B as n,T as o,z as r,w as s,R as t,b as u};