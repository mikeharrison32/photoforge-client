export function createProgram(gl: WebGL2RenderingContext | WebGLRenderingContext, vertexShaderSource: string, fragmentShaderSource: string){


    
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if(!vertexShader){
        console.error("No vertext shader")
        return
    }
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    if(!fragmentShader){
        console.error("No fragment shader")
        return
    }
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    
    // Create a shader program
    const shaderProgram = gl.createProgram();

    if(!shaderProgram){
        console.error("No shader program")
        return
    }
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    // gl.linkProgram(shaderProgram);
    // gl.useProgram(shaderProgram);
    

    return shaderProgram
}





export function drawImage(gl: WebGLRenderingContext | WebGL2RenderingContext, image: any){
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
}`
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

const program = createProgram(gl, BASE_VERTEX_SHADER, fragmentShaderSource)
gl.linkProgram(program!);

// Enable the program
gl.useProgram(program!);
const VERTICES = new Float32Array([-1, -1, -1, 1, 1, 1, -1, -1, 1, 1, 1, -1]);

const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, VERTICES, gl.STATIC_DRAW);

const positionLocation = gl.getAttribLocation(program!, "position");
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

