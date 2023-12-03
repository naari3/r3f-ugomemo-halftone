uniform sampler2D tDiffuse;
uniform float u_pixelSize;
uniform vec2 u_resolution;
varying vec2 vUv;


// 4
// ■□■□
// □■□■
// ■□■□
// □■□■
const bool pattern4[16] = bool[16](
    false, true, false, true,
    true, false, true, false,
    false, true, false, true,
    true, false, true, false
);

// 5
// □■□■
// ■□■■
// □■□■
// ■■■□
const bool pattern5[16] = bool[16](
    false, true, false, true,
    true, false, true, true,
    false, true, false, true,
    true, true, true, false
);

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

    // 4x4のグリッドのどこにいるかを取得する
    int posX = int(mod(floor(vUv.x / pixelSizeX), 4.0));
    int posY = int(mod(floor(vUv.y / pixelSizeY), 4.0));
    int gridIndex = posX + posY * 4;

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

    // 0.0-4.0 の graySum を 0,1,2,3,4,5,6,7 の8段階に分ける
    int level = int(graySum / 0.5);

    // 0
    // □□□□
    // □□□□
    // □□□□
    // □□□□
    //
    // 1
    // ■□□□
    // □□□□
    // □□□□
    // □□□□
    //
    // 2
    // ■□□□
    // □□□□
    // □□■□
    // □□□□
    //
    // 3
    // ■□■□
    // □□□□
    // ■□■□
    // □□□□
    //
    // 4
    // ■□■□
    // □■□■
    // ■□■□
    // □■□■
    //
    // 5
    // □■□■
    // ■□■■
    // □■□■
    // ■■■□
    //
    // 6
    // □■□■
    // ■■■■
    // □■□■
    // ■■■■
    //
    // 7
    // ■■■■
    // ■■■■
    // ■■■■
    // ■■■■
    bool shouldPaintWhite = false;

    switch (level) {
        case 0:
            break;
        case 1:
            shouldPaintWhite = (gridIndex == 0);
            break;
        case 2:
            shouldPaintWhite = (gridIndex == 0 || gridIndex == 10);
            break;
        case 3:
            shouldPaintWhite = (gridIndex % 2 == 0) && (gridIndex / 4 % 2 == 0);
            break;
        case 4:
            shouldPaintWhite = pattern4[gridIndex];
            break;
        case 5:
            shouldPaintWhite = pattern5[gridIndex];
            break;
        case 6:
            shouldPaintWhite = (gridIndex % 8 != 0) && (gridIndex % 8 != 2);
            break;
        case 7:
            shouldPaintWhite = true;
            break;
    }

    gl_FragColor = shouldPaintWhite ? vec4(1.0, 1.0, 1.0, 1.0) : vec4(0.0, 0.0, 0.0, 1.0);
}
