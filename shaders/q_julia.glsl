precision highp float;

uniform vec2 RESOLUTION;
uniform vec2 CENTER;
uniform vec2 RANGE;
uniform vec2 JULIA_C;
uniform vec2 MSAA_COORDINATES[16];

uniform float SHADER;
uniform float ROTATION;
uniform float BRIGHTNESS;
uniform float COLORSET;
uniform float EXPONENT;
uniform float ITERATIONS;
uniform float SUPERSAMPLES;

const int MAX_ITERATIONS = 256;
const float pi = 3.1415926;

vec2 PIXEL_SIZE = RANGE / RESOLUTION;
float ASPECT_RATIO = RESOLUTION.x / RESOLUTION.y;

vec4 q_mult (vec4 q1, vec4 q2) {
  return vec4 (
    q1.x * q2.x - q1.y * q2.y - q1.z * q2.z - q1.w * q2.w,
    q1.x * q2.y + q1.y * q2.x + q1.z * q2.w - q1.w * q2.z,
    q1.x * q2.z - q1.y * q2.w + q1.z * q2.x + q1.w * q2.y,
    q1.x * q2.w + q1.y * q2.z - q1.z * q2.y + q1.w * q2.x
  );
}

vec3 square_sphere (vec3 t) {
  float x = t.x;
  float y = t.y;
  float z = t.z;

  float r = length(t);
  float yang = atan(length(t.xy), z);
  float zang = atan(y, x);

  return vec3(
    (r * r) * sin(yang * 2.0 + 0.5 * pi) * cos(zang * 2.0 + pi),
    (r * r) * sin(yang * 2.0 + 0.5 * pi) * sin(zang * 2.0 + pi),
    (r * r) * cos(yang * 2.0 + 0.5 * pi)
  );
}

int fractal(vec4 c, vec4 z) {
  for (int iteration = 0; iteration < MAX_ITERATIONS; iteration++) {

    // z <- z^2 + c
    z = vec4(square_sphere(z.xyz), 0.0) + c;

    float magnitude = length(z);
    if (magnitude > 2.0) {
      return iteration;
    }

    if (iteration > int(ITERATIONS)) {
      return 0;
    }
  }

  return 0;
}

int mandelbrot(vec4 coordinate) {
  return fractal(coordinate, vec4(0.0));
}

int julia(vec4 coordinate, vec4 offset) {
  return fractal(offset, coordinate);
}

vec2 rotate2D(vec2 point, vec2 center, float rotation) {
  vec2 delta = point - center;

  float magnitude = length(delta);
  float angle = atan(delta.y, delta.x);

  return center + vec2(
    magnitude * cos(angle + rotation),
    magnitude * sin(angle + rotation)
  );
}

vec2 fragCoordToXY(vec4 fragCoord) {
  vec2 relativePosition = fragCoord.xy / RESOLUTION;

  vec2 cartesianPosition = CENTER + (relativePosition - 0.5) * RANGE;

  return rotate2D(cartesianPosition, CENTER, ROTATION);
}

float walk_forward(vec2 coordinate) {
  for (float z = 2.0; z > 0.0; z -= 0.01) {
    vec4 startingPoint = vec4(coordinate, z, 0.0);

    int iteration = mandelbrot(startingPoint);

    if (iteration > int(ITERATIONS) / 2) {
      return z;
    }
  }

  return 0.0;
}

void main() {
  vec2 coordinate = fragCoordToXY(gl_FragCoord);

  float fractalValue = walk_forward(coordinate) / ITERATIONS * BRIGHTNESS;

  gl_FragColor = vec4(fractalValue, fractalValue, fractalValue, 1.0);
}
