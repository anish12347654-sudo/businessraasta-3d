import{_ as e,a as t,d as n,f as r,i,l as a,m as o,n as s,r as c,t as l}from"./index-BKvbBODG.js";import{$ as u,A as d,At as f,C as p,Ct as m,Et as h,F as g,G as ee,H as _,L as te,Nt as ne,Q as re,S as ie,U as v,V as ae,X as y,_ as oe,bt as se,dt as ce,et as le,gt as ue,ht as de,j as fe,jt as b,k as x,kt as S,lt as pe,m as C,rt as w,u as me,w as he,wt as ge,x as T,yt as _e}from"./events-9ce18a08.esm-K6XmI2oG.js";import{t as ve}from"./extends-CvVTau-c.js";import{n as ye,t as be}from"./MapPin-mX9Oay5F.js";var xe=parseInt(`186`.replace(/\D+/g,``)),Se=xe>=125?`uv1`:`uv2`,Ce=new T,E=new f,D=class extends ae{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type=`LineSegmentsGeometry`,this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute(`position`,new te([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute(`uv`,new te([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new _(t,6,1);return this.setAttribute(`instanceStart`,new v(n,3,0)),this.setAttribute(`instanceEnd`,new v(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));let r=new _(n,t*2,1);return this.setAttribute(`instanceColorStart`,new v(r,t,0)),this.setAttribute(`instanceColorEnd`,new v(r,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new ne(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new T);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),Ce.setFromBufferAttribute(t),this.boundingBox.union(Ce))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _e),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let r=0;for(let i=0,a=e.count;i<a;i++)E.fromBufferAttribute(e,i),r=Math.max(r,n.distanceToSquared(E)),E.fromBufferAttribute(t,i),r=Math.max(r,n.distanceToSquared(E));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error(`THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.`,this)}}toJSON(){}applyMatrix(e){return console.warn(`THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4().`),this.applyMatrix4(e)}},we=class extends D{constructor(){super(),this.isLineGeometry=!0,this.type=`LineGeometry`}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let r=0;r<t;r+=3)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];return super.setPositions(n),this}setColors(e,t=3){let n=e.length-t,r=new Float32Array(2*n);if(t===3)for(let i=0;i<n;i+=t)r[2*i]=e[i],r[2*i+1]=e[i+1],r[2*i+2]=e[i+2],r[2*i+3]=e[i+3],r[2*i+4]=e[i+4],r[2*i+5]=e[i+5];else for(let i=0;i<n;i+=t)r[2*i]=e[i],r[2*i+1]=e[i+1],r[2*i+2]=e[i+2],r[2*i+3]=e[i+3],r[2*i+4]=e[i+4],r[2*i+5]=e[i+5],r[2*i+6]=e[i+6],r[2*i+7]=e[i+7];return super.setColors(r,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}},O=class extends de{constructor(e){super({type:`LineMaterial`,uniforms:h.clone(h.merge([oe.common,oe.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new S(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${xe>=154?`colorspace_fragment`:`encodings_fragment`}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA=`1`:delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return`WORLD_UNITS`in this.defines},set:function(e){e===!0?this.defines.WORLD_UNITS=``:delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return`USE_DASH`in this.defines},set(e){!!e!=`USE_DASH`in this.defines&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH=``:delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return`USE_ALPHA_TO_COVERAGE`in this.defines},set:function(e){!!e!=`USE_ALPHA_TO_COVERAGE`in this.defines&&(this.needsUpdate=!0),e===!0?(this.defines.USE_ALPHA_TO_COVERAGE=``,this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}},k=new b,Te=new f,Ee=new f,A=new b,j=new b,M=new b,N=new f,P=new re,F=new ee,De=new f,I=new T,L=new _e,R=new b,z,B;function Oe(e,t,n){return R.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),R.multiplyScalar(1/R.w),R.x=B/n.width,R.y=B/n.height,R.applyMatrix4(e.projectionMatrixInverse),R.multiplyScalar(1/R.w),Math.abs(Math.max(R.x,R.y))}function ke(e,t){let n=e.matrixWorld,r=e.geometry,i=r.attributes.instanceStart,a=r.attributes.instanceEnd,o=Math.min(r.instanceCount,i.count);for(let r=0,s=o;r<s;r++){F.start.fromBufferAttribute(i,r),F.end.fromBufferAttribute(a,r),F.applyMatrix4(n);let o=new f,s=new f;z.distanceSqToSegment(F.start,F.end,s,o),s.distanceTo(o)<B*.5&&t.push({point:s,pointOnLine:o,distance:z.origin.distanceTo(s),object:e,face:null,faceIndex:r,uv:null,[Se]:null})}}function Ae(e,t,n){let r=t.projectionMatrix,i=e.material.resolution,a=e.matrixWorld,o=e.geometry,s=o.attributes.instanceStart,c=o.attributes.instanceEnd,l=Math.min(o.instanceCount,s.count),u=-t.near;z.at(1,M),M.w=1,M.applyMatrix4(t.matrixWorldInverse),M.applyMatrix4(r),M.multiplyScalar(1/M.w),M.x*=i.x/2,M.y*=i.y/2,M.z=0,N.copy(M),P.multiplyMatrices(t.matrixWorldInverse,a);for(let t=0,o=l;t<o;t++){if(A.fromBufferAttribute(s,t),j.fromBufferAttribute(c,t),A.w=1,j.w=1,A.applyMatrix4(P),j.applyMatrix4(P),A.z>u&&j.z>u)continue;if(A.z>u){let e=A.z-j.z,t=(A.z-u)/e;A.lerp(j,t)}else if(j.z>u){let e=j.z-A.z,t=(j.z-u)/e;j.lerp(A,t)}A.applyMatrix4(r),j.applyMatrix4(r),A.multiplyScalar(1/A.w),j.multiplyScalar(1/j.w),A.x*=i.x/2,A.y*=i.y/2,j.x*=i.x/2,j.y*=i.y/2,F.start.copy(A),F.start.z=0,F.end.copy(j),F.end.z=0;let o=F.closestPointToPointParameter(N,!0);F.at(o,De);let l=y.lerp(A.z,j.z,o),d=l>=-1&&l<=1,p=N.distanceTo(De)<B*.5;if(d&&p){F.start.fromBufferAttribute(s,t),F.end.fromBufferAttribute(c,t),F.start.applyMatrix4(a),F.end.applyMatrix4(a);let r=new f,i=new f;z.distanceSqToSegment(F.start,F.end,i,r),n.push({point:i,pointOnLine:r,distance:z.origin.distanceTo(i),object:e,face:null,faceIndex:t,uv:null,[Se]:null})}}}var je=class extends u{constructor(e=new D,t=new O({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type=`LineSegments2`}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,r=new Float32Array(2*t.count);for(let e=0,i=0,a=t.count;e<a;e++,i+=2)Te.fromBufferAttribute(t,e),Ee.fromBufferAttribute(n,e),r[i]=i===0?0:r[i-1],r[i+1]=r[i]+Te.distanceTo(Ee);let i=new _(r,2,1);return e.setAttribute(`instanceDistanceStart`,new v(i,1,0)),e.setAttribute(`instanceDistanceEnd`,new v(i,1,1)),this}raycast(e,t){let n=this.material.worldUnits,r=e.camera;r===null&&!n&&console.error(`LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.`);let i=e.params.Line2===void 0?0:e.params.Line2.threshold||0;z=e.ray;let a=this.matrixWorld,o=this.geometry,s=this.material;B=s.linewidth+i,o.boundingSphere===null&&o.computeBoundingSphere(),L.copy(o.boundingSphere).applyMatrix4(a);let c;if(c=n?B*.5:Oe(r,Math.max(r.near,L.distanceToPoint(z.origin)),s.resolution),L.radius+=c,z.intersectsSphere(L)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),I.copy(o.boundingBox).applyMatrix4(a);let l;l=n?B*.5:Oe(r,Math.max(r.near,I.distanceToPoint(z.origin)),s.resolution),I.expandByScalar(l),z.intersectsBox(I)!==!1&&(n?ke(this,t):Ae(this,r,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(k),this.material.uniforms.resolution.value.set(k.z,k.w))}},Me=class extends je{constructor(e=new we,t=new O({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type=`Line2`}},V=e(o()),H=V.forwardRef(function({points:e,color:t=16777215,vertexColors:n,linewidth:r,lineWidth:i,segments:a,dashed:o,...s},c){var l;let u=C(e=>e.size),d=V.useMemo(()=>a?new je:new Me,[a]),[p]=V.useState(()=>new O),m=(n==null||(l=n[0])==null?void 0:l.length)===4?4:3,h=V.useMemo(()=>{let r=a?new D:new we,i=e.map(e=>{let t=Array.isArray(e);return e instanceof f||e instanceof b?[e.x,e.y,e.z]:e instanceof S?[e.x,e.y,0]:t&&e.length===3?[e[0],e[1],e[2]]:t&&e.length===2?[e[0],e[1],0]:e});if(r.setPositions(i.flat()),n){t=16777215;let e=n.map(e=>e instanceof x?e.toArray():e);r.setColors(e.flat(),m)}return r},[e,a,n,m]);return V.useLayoutEffect(()=>{d.computeLineDistances()},[e,d]),V.useLayoutEffect(()=>{o?p.defines.USE_DASH=``:delete p.defines.USE_DASH,p.needsUpdate=!0},[o,p]),V.useEffect(()=>()=>{h.dispose(),p.dispose()},[h]),V.createElement(`primitive`,ve({object:d,ref:c},s),V.createElement(`primitive`,{object:h,attach:`geometry`}),V.createElement(`primitive`,ve({object:p,attach:`material`,color:t,vertexColors:!!n,resolution:[u.width,u.height],linewidth:r??i??1,dashed:o,transparent:m===4},s)))}),U=r(),Ne=.55,W=null;function Pe(){if(W)return W;let e=new ge(new ce(new f(-.36,.72,0),new f(0,.05,0),new f(.36,.72,0)),20,.022,5);return W={body:new w({color:`#1A4E94`,roughness:.5,metalness:.25,emissive:`#0B2E5E`,emissiveIntensity:.5}),light:new w({color:`#E8EEF7`,roughness:.6,metalness:.1,emissive:`#3B82F6`,emissiveIntensity:.15}),accent:new w({color:`#F07818`,emissive:`#F07818`,emissiveIntensity:.9,roughness:.4}),window:new le({color:`#FFB36B`,toneMapped:!1}),red:new w({color:`#DC2626`,emissive:`#DC2626`,emissiveIntensity:.4,roughness:.5}),box:new ie(1,1,1),cyl:new fe(1,1,1,10),cone:new d(1,1,10),dome:new se(1,10,6,0,Math.PI*2,0,Math.PI/2),sphere:new se(1,10,8),arch:new m(1,.22,6,14,Math.PI),cable:e},W}function G({g:e,m:t,p:n,s:r,r:i}){let a=Pe();return(0,U.jsx)(`mesh`,{geometry:a[e],material:a[t],position:n,scale:r,rotation:i})}var K=(e,t,n,r,i,a,o)=>(0,U.jsx)(G,{g:`box`,m:e,p:[t,n+a/2,r],s:[i,a,o]}),q=(e,t,n,r,i,a,o=i)=>o===i?(0,U.jsx)(G,{g:`cyl`,m:e,p:[t,n+a/2,r],s:[i,a,i]}):(0,U.jsx)(Ie,{m:e,x:t,y0:n,z:r,r:i,h:a,rTop:o}),Fe=new Map;function Ie({m:e,x:t,y0:n,z:r,r:i,h:a,rTop:o}){let s=(0,V.useMemo)(()=>{let e=`${i}:${a}:${o}`,t=Fe.get(e);return t||Fe.set(e,t=new fe(o,i,a,12)),t},[i,a,o]);return(0,U.jsx)(`mesh`,{geometry:s,material:Pe()[e],position:[t,n+a/2,r]})}var Le={"india-gate":()=>(0,U.jsxs)(U.Fragment,{children:[K(`light`,0,0,0,.95,.07,.4),K(`light`,-.29,.07,0,.26,.66,.3),K(`light`,.29,.07,0,.26,.66,.3),(0,U.jsx)(G,{g:`arch`,m:`light`,p:[0,.58,0],s:[.16,.16,.6]}),K(`light`,0,.73,0,.86,.17,.32),K(`accent`,0,.8,.165,.7,.04,.01),K(`light`,0,.9,0,.5,.1,.24),(0,U.jsx)(G,{g:`dome`,m:`accent`,p:[0,1,0],s:[.1,.07,.1]})]}),"gateway-of-india":()=>(0,U.jsxs)(U.Fragment,{children:[K(`light`,0,0,0,1,.62,.34),K(`window`,0,0,.172,.26,.4,.01),(0,U.jsx)(G,{g:`arch`,m:`accent`,p:[0,.4,.18],s:[.15,.15,.15]}),[-.42,.42].map(e=>(0,U.jsxs)(`group`,{children:[q(`light`,e,0,.12,.07,.78),(0,U.jsx)(G,{g:`dome`,m:`accent`,p:[e,.78,.12],s:[.075,.08,.075]})]},e)),[-.22,.22].map(e=>(0,U.jsx)(G,{g:`dome`,m:`light`,p:[e,.62,0],s:[.1,.1,.1]},e)),(0,U.jsx)(G,{g:`dome`,m:`accent`,p:[0,.62,0],s:[.15,.15,.15]})]}),charminar:()=>(0,U.jsxs)(U.Fragment,{children:[K(`light`,0,0,0,.56,.5,.56),K(`window`,0,.06,.281,.2,.3,.01),K(`window`,.281,.06,0,.01,.3,.2),K(`light`,0,.5,0,.62,.06,.62),(0,U.jsx)(G,{g:`dome`,m:`accent`,p:[0,.56,0],s:[.17,.14,.17]}),[[-.28,-.28],[.28,-.28],[-.28,.28],[.28,.28]].map(([e,t])=>(0,U.jsxs)(`group`,{children:[q(`light`,e,0,t,.06,.92),(0,U.jsx)(G,{g:`cone`,m:`accent`,p:[e,.99,t],s:[.065,.14,.065]})]},`${e}${t}`))]}),"tech-tower":()=>(0,U.jsxs)(U.Fragment,{children:[K(`body`,0,0,0,.5,.36,.42),K(`window`,0,.06,.212,.42,.05,.01),K(`window`,0,.2,.212,.42,.05,.01),K(`body`,0,.36,0,.38,.3,.32),K(`window`,0,.44,.162,.3,.05,.01),K(`window`,0,.56,.162,.3,.05,.01),K(`body`,0,.66,0,.26,.2,.22),K(`accent`,0,.86,0,.28,.03,.24),q(`light`,0,.89,0,.012,.2),(0,U.jsx)(G,{g:`sphere`,m:`accent`,p:[0,1.1,0],s:[.035,.035,.035]})]}),lighthouse:()=>(0,U.jsxs)(U.Fragment,{children:[q(`light`,0,0,0,.26,.06),q(`light`,0,.06,0,.17,.66,.1),q(`red`,0,.3,0,.145,.14,.13),q(`light`,0,.72,0,.14,.03),q(`window`,0,.75,0,.09,.13),(0,U.jsx)(G,{g:`cone`,m:`accent`,p:[0,.95,0],s:[.12,.14,.12]})]}),"howrah-bridge":()=>(0,U.jsxs)(U.Fragment,{children:[K(`body`,0,.18,0,1.1,.05,.18),K(`accent`,0,.23,.085,1.1,.02,.01),[-.36,.36].map(e=>(0,U.jsxs)(`group`,{children:[K(`light`,e,0,-.06,.07,.78,.05),K(`light`,e,0,.06,.07,.78,.05),K(`light`,e,.7,0,.09,.05,.18)]},e)),(0,U.jsx)(G,{g:`cable`,m:`accent`,p:[0,0,-.06],s:[1,1,1]}),(0,U.jsx)(G,{g:`cable`,m:`accent`,p:[0,0,.06],s:[1,1,1]}),K(`light`,-.46,0,0,.1,.18,.16),K(`light`,.46,0,0,.1,.18,.16)]}),"shaniwar-wada":()=>(0,U.jsxs)(U.Fragment,{children:[K(`body`,0,0,0,.9,.34,.6),[-.3,-.15,.15,.3].map(e=>(0,U.jsx)(`group`,{children:K(`body`,e,.34,.28,.07,.06,.04)},e)),[-.45,.45].map(e=>(0,U.jsx)(`group`,{children:q(`body`,e,0,.3,.09,.44)},e)),K(`light`,0,0,.26,.3,.56,.12),K(`window`,0,0,.322,.12,.26,.01),(0,U.jsx)(G,{g:`arch`,m:`accent`,p:[0,.26,.325],s:[.07,.07,.07]}),K(`accent`,0,.56,.26,.34,.04,.14)]}),"kanaka-durga":()=>(0,U.jsxs)(U.Fragment,{children:[K(`light`,0,0,0,.74,.16,.74),K(`light`,0,.16,0,.58,.16,.58),K(`accent`,0,.32,0,.46,.04,.46),K(`light`,0,.36,0,.42,.16,.42),K(`light`,0,.52,0,.28,.16,.28),K(`window`,0,.02,.371,.14,.12,.01),K(`light`,0,.68,0,.16,.12,.16),(0,U.jsx)(G,{g:`cone`,m:`accent`,p:[0,.88,0],s:[.08,.16,.08]}),(0,U.jsx)(G,{g:`sphere`,m:`accent`,p:[0,.99,0],s:[.035,.035,.035]})]})},Re=(0,V.forwardRef)(function({kind:e,...t},n){let r=Le[e];return(0,U.jsx)(`group`,{ref:n,...t,children:(0,U.jsx)(`group`,{scale:Ne,children:(0,U.jsx)(r,{})})})});function ze(e=t){return c(e).map(e=>new ue(e.map(([e,t])=>new S(e,-t))))}var J=.25,Be=.26,Y=y.degToRad(8),X=y.degToRad(56),Ve=35,He=.12,Ue=.6,We=1.4,Ge=3.5,Ke=[[`Delhi`,`Mumbai`],[`Mumbai`,`Pune`],[`Pune`,`Hyderabad`],[`Hyderabad`,`Vijayawada`],[`Vijayawada`,`Chennai`],[`Chennai`,`Bangalore`],[`Bangalore`,`Pune`],[`Hyderabad`,`Kolkata`],[`Kolkata`,`Delhi`]],Z=a.map(e=>s(e.lon,e.lat)),Q=i(),$=new f((Q.minX+Q.maxX)/2,0,(Q.minZ+Q.maxZ)/2),qe=new f(0,Math.sin(X),Math.cos(X));function Je(e,t){let[n,r]=Z[e]??[$.x,$.z];return t.set(y.lerp($.x,n,He),.3,y.lerp($.z,r,He))}function Ye(e,t=.95){let n=new pe(Ve,e,.1,500),r=[...c().flatMap(e=>e.map(([e,t])=>[e,J,t])),...Z.map(([e,t])=>[e,1.6,t])],i=[];for(let[e,t,n]of r)for(let r of[-Y,0,Y]){let a=Math.cos(r),o=Math.sin(r);i.push(new f(e*a+n*o,t,-e*o+n*a))}let a=new f,o=new f,s=e=>{for(let r=0;r<Z.length;r++){Je(r,a),n.position.copy(a).addScaledVector(qe,e),n.lookAt(a),n.updateMatrixWorld();for(let e of i)if(o.copy(e).project(n),Math.abs(o.x)>t||Math.abs(o.y)>t||o.z>1)return!1}return!0},l=4,u=120;for(let e=0;e<24;e++){let e=(l+u)/2;s(e)?u=e:l=e}return u}var Xe=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Ze=`
  uniform float uTime;
  uniform vec3 uGlow;
  uniform vec3 uDash;
  varying vec2 vUv;
  void main() {
    float dash = step(0.5, fract(vUv.x - uTime * 0.6));
    float a = mix(0.28, 1.0, dash);
    vec3 col = mix(uGlow * 0.8, uDash * 1.5, dash);
    gl_FragColor = vec4(col * a, 1.0);
    #include <colorspace_fragment>
  }
`;function Qe(e){return(0,V.useMemo)(()=>{let t=ze(),n=new g(t,{depth:J,bevelEnabled:!0,bevelThickness:.02,bevelSize:.03,bevelSegments:1,curveSegments:1});n.rotateX(-Math.PI/2),n.translate(0,-.02,0);let r=new w({color:`#0B2E5E`,roughness:.55,metalness:.35,emissive:`#0B2E5E`,emissiveIntensity:.35}),i=new w({color:`#1A4E94`,roughness:.4,metalness:.5,emissive:`#2563EB`,emissiveIntensity:.35}),o=c(),s=o.map(e=>[...e,e[0]].map(([e,t])=>new f(e,Be,t))),u=[];for(let t=Q.minX;t<=Q.maxX;t+=e)for(let n=Q.minZ;n<=Q.maxZ;n+=e)o.some(e=>e.length>8&&l(t,n,e))&&u.push(t,.262,n);let d=new he;return d.setAttribute(`position`,new p(new Float32Array(u),3)),{land:n,top:r,side:i,borders:s,dotGeo:d,arcMat:new de({uniforms:{uTime:{value:0},uGlow:{value:new x(`#F07818`)},uDash:{value:new x(`#FFB36B`)}},vertexShader:Xe,fragmentShader:Ze,transparent:!0,depthWrite:!1,blending:2}),arcs:Ke.map(([e,t])=>{let[n,r]=Z[a.findIndex(t=>t.name===e)],[i,o]=Z[a.findIndex(e=>e.name===t)],s=new f(n,.28,r),c=new f(i,.28,o),l=s.distanceTo(c),u=s.clone().lerp(c,.5);u.y+=.25+l*.3;let d=new ge(new ce(s,u,c),40,.022,6,!1),p=d.getAttribute(`uv`),m=Math.max(3,Math.round(l*5));for(let e=0;e<p.count;e++)p.setX(e,p.getX(e)*m);return d})}},[e])}function $e({activeCity:e=0,onSelect:t}){let{tier:r,reducedMotion:i,isTouch:o}=n(),s=Qe(r===`high`?.14:r===`medium`?.17:.22),c=(0,V.useRef)(null),l=(0,V.useRef)([]),u=(0,V.useRef)([]),d=(0,V.useRef)(null),p=C(e=>e.camera),m=C(e=>e.size),h=C(e=>e.invalidate),g=(0,V.useMemo)(()=>({target:new f,look:new f,pos:new f,dist:20,init:!1}),[]);return(0,V.useEffect)(()=>()=>{s.land.dispose(),s.top.dispose(),s.side.dispose(),s.dotGeo.dispose(),s.arcMat.dispose(),s.arcs.forEach(e=>e.dispose())},[s]),(0,V.useEffect)(()=>{p.fov=Ve,p.aspect=m.width/m.height,p.updateProjectionMatrix(),g.dist=Ye(p.aspect),g.init=!1,h()},[p,m,g,h]),(0,V.useEffect)(()=>{h()},[e,h]),me((t,n)=>{let r=t.clock.elapsedTime,o=i||!g.init?1:Math.min(n,.1),f=i||!g.init?1e3:Ge;s.arcMat.uniforms.uTime.value=i?0:r,c.current&&(c.current.rotation.y=i?0:Math.sin(r*.25)*Y),Je(e,g.target),g.look.set(y.damp(g.look.x,g.target.x,f,o),y.damp(g.look.y,g.target.y,f,o),y.damp(g.look.z,g.target.z,f,o)),p.position.copy(g.look).addScaledVector(qe,g.dist),p.lookAt(g.look),g.init=!0;for(let t=0;t<a.length;t++){let n=t===e,a=l.current[t];if(a){let e=i?0:Math.sin(r*1.6+t)*.03;a.position.y=y.damp(a.position.y,(n?Ue:0)+e,f*1.6,o),a.scale.setScalar(y.damp(a.scale.x,n?We:1,f*1.6,o))}let s=u.current[t];if(s){let e=n?1.1+(i?0:Math.sin(r*3.2)*.18):.55;s.scale.setScalar(y.damp(s.scale.x,e,f*2,o)),s.material.opacity=y.damp(s.material.opacity,n?.95:.45,f*2,o)}}if(d.current){let[t,n]=Z[e]??[0,0];d.current.position.set(t,1.65,n)}}),(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(`hemisphereLight`,{args:[`#9EC5FF`,`#07142B`,1.3]}),(0,U.jsx)(`directionalLight`,{position:[3,10,7],intensity:1.8,color:`#ffffff`}),(0,U.jsx)(`directionalLight`,{position:[-5,2,-9],intensity:4,color:`#3B82F6`}),(0,U.jsx)(`directionalLight`,{position:[6,1.5,-4],intensity:2,color:`#60A5FA`}),(0,U.jsxs)(`group`,{ref:c,children:[(0,U.jsx)(ye,{position:[$.x,-1.2,$.z],scale:15,color:`#2563EB`,opacity:.3}),(0,U.jsx)(`mesh`,{geometry:s.land,material:[s.top,s.side]}),s.borders.map((e,t)=>e.length>12?(0,U.jsxs)(`group`,{children:[(0,U.jsx)(H,{points:e,color:`#F7943F`,lineWidth:7,transparent:!0,opacity:.22,depthWrite:!1,toneMapped:!1}),(0,U.jsx)(H,{points:e,color:`#FFB36B`,lineWidth:1.8,toneMapped:!1})]},t):(0,U.jsx)(H,{points:e,color:`#FFB36B`,lineWidth:1.4,toneMapped:!1},t)),(0,U.jsx)(`points`,{geometry:s.dotGeo,children:(0,U.jsx)(`pointsMaterial`,{color:`#60A5FA`,size:.035,sizeAttenuation:!0,transparent:!0,opacity:.55,depthWrite:!1})}),s.arcs.map((e,t)=>(0,U.jsx)(`mesh`,{geometry:e,material:s.arcMat,renderOrder:2},t)),(0,U.jsx)(`pointLight`,{ref:d,color:`#F07818`,intensity:6,distance:3.5,decay:1.5}),a.map((e,n)=>{let[r,i]=Z[n];return(0,U.jsxs)(`group`,{position:[r,J,i],onClick:e=>{e.stopPropagation(),t?.(n)},onPointerOver:e=>{e.stopPropagation(),o||t?.(n)},children:[(0,U.jsx)(ye,{ref:e=>{u.current[n]=e},position:[0,.06,0],scale:.55,color:`#F07818`,opacity:.45}),(0,U.jsxs)(`group`,{ref:e=>{l.current[n]=e},children:[(0,U.jsx)(Re,{kind:e.landmark}),(0,U.jsx)(be,{position:[0,.66,0],scale:.24,color:`#F07818`,haloColor:`#FFB36B`,glow:.55,halo:.7})]})]},e.name)})]})]})}export{$e as default};