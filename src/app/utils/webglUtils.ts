export function createProgram(
  gl: WebGL2RenderingContext | WebGLRenderingContext,
  vertexShaderSource: string,
  fragmentShaderSource: string
) {
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  if (!vertexShader) {
    console.error('No vertext shader');
    return;
  }
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  if (!fragmentShader) {
    console.error('No fragment shader');
    return;
  }
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);

  // Create a shader program
  const shaderProgram = gl.createProgram();

  if (!shaderProgram) {
    console.error('No shader program');
    return;
  }
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  // gl.linkProgram(shaderProgram);
  // gl.useProgram(shaderProgram);

  return shaderProgram;
}

export function drawImage(
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  image: any
) {
  const BASE_VERTEX_SHADER = `
  attribute vec2 position;
  varying vec2 texCoords;

  void main() {
    texCoords = (position + 1.0) / 2.0;

    texCoords.y = 1.0 - texCoords.y;
    
    gl_Position = vec4(position, 0, 1.0);
  }
`;

  const fragmentShaderSource = `
precision highp float;
varying vec2 texCoords;
uniform sampler2D textureSampler;
  
vec3 adjustBrightness(vec3 color, float brightness) {
  return color + brightness;
}
  
vec3 adjustContrast(vec3 color, float contrast) {
  return 0.5 + (contrast + 1.0) * (color.rgb - 0.5);
}

vec3 adjustSaturation(vec3 color, float saturation) {
  // WCAG 2.1 relative luminance base
  const vec3 luminanceWeighting = vec3(0.2126, 0.7152, 0.0722);
  vec3 grayscaleColor = vec3(dot(color, luminanceWeighting));
  return mix(grayscaleColor, color, 1.0 + saturation);
}

void main() {
  vec4 color = texture2D(textureSampler, texCoords);
 // color.rgb = adjustBrightness(color.rgb, 0.5);

    
  gl_FragColor = color;
}`;
  const BASE_FRAGMENT_SHADER = `
  precision highp float;
  
  varying vec2 texCoords;
  uniform sampler2D textureSampler;

  void main() {
    vec4 color = texture2D(textureSampler, texCoords);
    gl_FragColor = color;
  }
`;

  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  // Create a texture

  const program = createProgram(gl, BASE_VERTEX_SHADER, fragmentShaderSource);
  gl.linkProgram(program!);

  // Enable the program
  gl.useProgram(program!);
  const VERTICES = new Float32Array([-1, -1, -1, 1, 1, 1, -1, -1, 1, 1, 1, -1]);

  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, VERTICES, gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program!, 'position');
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  gl.enableVertexAttribArray(positionLocation);

  const texture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  // Draw our 6 VERTICES as 2 triangles
  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

export function drawRectangle(
  gl: WebGLRenderingContext,
  x: number,
  y: number,
  width: number,
  height: number
) {
  const vertextShaderSource = `
  attribute vec2 a_position;
uniform vec2 u_resolution;
void main() {
   // convert the rectangle from pixels to 0.0 to 1.0
   vec2 zeroToOne = a_position / u_resolution;
   // convert from 0->1 to 0->2
   vec2 zeroToTwo = zeroToOne * 2.0;
   // convert from 0->2 to -1->+1 (clipspace)
   vec2 clipSpace = zeroToTwo - 1.0;
   gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
}
  `;
  const fragmentShaderSource = `
  precision mediump float;
  uniform vec4 u_color;
  void main() {
     gl_FragColor = u_color;
  }`;
  const program = createProgram(gl, vertextShaderSource, fragmentShaderSource);
  gl.linkProgram(program!);
  gl.useProgram(program!);
  let x1 = x;
  let x2 = x + width;
  let y1 = y;
  let y2 = y + height;
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
    gl.STATIC_DRAW
  );
}

export function getPixels(
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  x: number,
  y: number,
  width: number,
  height: number
) {
  const pixels = new Uint8Array(
    gl.drawingBufferWidth * gl.drawingBufferHeight * 4
  );

  gl.readPixels(
    x, //x
    y, //y
    width,
    height,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    pixels
  );
  return pixels;
}

export function insertPixels(
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  pixels: Uint8Array,
  x: number,
  y: number
) {
  const imgdata = new ImageData(500, 500);
  imgdata.data.set(pixels);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgdata);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  gl.texSubImage2D(
    gl.TEXTURE_2D,
    0,
    0,
    0,
    100,
    100,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    pixels
  );
}

export function modidfyPixels(
  gl: WebGLRenderingContext | WebGL2RenderingContext
) {
  const vs = `  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }`;
  const fs = `  precision highp float;
  uniform vec4 color;
  void main() {
    gl_FragColor = color;
  }`;

  const program = createProgram(gl, vs, fs);
  gl.linkProgram(program!);
  gl.useProgram(program!);

  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
}
