
#define PI 3.14159265359
#define PI2 6.28318530718

//uniform sampler2D tDraw;
uniform sampler2D tMask;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uViewPos;


in float vInstanceID;
in vec3 vNormal;
in vec3 vPos;


vec3 color = vec3(0.0);

float rand (in vec2 st) {
    return fract(sin(dot(st.xy,
    vec2(12.9898,78.233)))
    * 43758.5453123);
}

float cnoise (vec2 n) {
	const vec2 d = vec2(0.0, 1.0);
  vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
	return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}

float surface3 ( vec3 coord ) {
        float frequency = 4.0;
        float n = 0.0;  
        n += 1.0    * abs( cnoise( vec2(coord * frequency) ) );
        n += 0.5    * abs( cnoise( vec2(coord * frequency * 2.0) ) );
        n += 0.25   * abs( cnoise( vec2(coord * frequency * 4.0) ) );
        return n;
}

void main() {

  vec2 tMaskSize = vec2(textureSize(tMask, 0));

  vec2 uv = gl_PointCoord.xy / 27.0 / vec2(3.0, 2.0);




  float v = 1.0-texture(tMask, uv*2.0).r;

  color = vec3(31.0, 24.0, 192.0) / 255.0;




  gl_FragColor = vec4(color, v);
}