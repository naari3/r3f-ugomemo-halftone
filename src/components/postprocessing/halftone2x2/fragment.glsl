uniform sampler2D tDiffuse;
uniform float u_pixelSize;
uniform vec2 u_resolution;
varying vec2 vUv;

float toGrayscale(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
}

// 画面の各ピクセルを2x2の大きさで分割しつつ、4x4の範囲の濃さを計算した上で各2x2のタイルを塗っていく
void main() {
    float aspectRatio = u_resolution.x / u_resolution.y;
    float pixelSizeX = u_pixelSize;
    float pixelSizeY = u_pixelSize * aspectRatio;

    vec2 pixelatedCoords = vec2(
        floor(vUv.x / pixelSizeX) * pixelSizeX,
        floor(vUv.y / pixelSizeY) * pixelSizeY
    );

    bool isEvenX = mod(floor(vUv.x / pixelSizeX), 2.0) == 0.0;
    bool isEvenY = mod(floor(vUv.y / pixelSizeY), 2.0) == 0.0;

    // 起点となる左上のピクセルの座標を取得する
    vec2 baseCoords = pixelatedCoords + vec2(pixelSizeX, pixelSizeY) * vec2(float(!isEvenX), float(!isEvenY));

    float graySum = 0.0;
    // 周辺のピクセルの輝度の総和を取得する
    for (int i = 0; i < 4; i++) {
        float x = baseCoords.x + pixelSizeX * float(i % 2);
        float y = baseCoords.y + pixelSizeY * float(i / 2);
        vec4 color = texture2D(tDiffuse, vec2(x, y));
        graySum += toGrayscale(color.rgb);
    }

    // 0.0-4.0 の graySum を4段階に分ける
    // 0.0-1.0 は 0
    // 1.0-2.0 は 1
    // 2.0-3.0 は 2
    // 3.0-4.0 は 3
    int level = int(graySum / 1.0);

    // 0の場合、左上、右上、左下、右下をすべて黒にする
    // 1の場合、左上を白にする
    // 2の場合、左上と右下を白にする
    // 3の場合、左上、右上、左下、右下をすべてを白にする
    bool shouldPaintWhite = (level == 1 && isEvenX && isEvenY) ||
                            (level == 2 && ((isEvenX && isEvenY) || (!isEvenX && !isEvenY))) ||
                            level == 3;
    gl_FragColor = shouldPaintWhite ? vec4(1.0, 1.0, 1.0, 1.0) : vec4(0.0, 0.0, 0.0, 1.0);
}
