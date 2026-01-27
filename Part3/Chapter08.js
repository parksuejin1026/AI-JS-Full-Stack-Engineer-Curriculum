/**
 * [ PART III. Deep Learning ]
 * Chapter 08. 합성곱 신경망 (CNN) 기초
 * * 학습 목표: 이미지의 특징을 추출하는 '필터(Filter)' 연산의 원리를 
 * 자바스크립트의 2차원 배열 조작을 통해 이해합니다.
 */

// 1. [데이터 설계] 가상의 3x3 이미지 데이터 (0: 검은색, 255: 흰색)
// 아래 데이터는 왼쪽은 어둡고 오른쪽은 밝은 '세로선' 경계가 있는 이미지입니다.
const inputImage = [
    [10, 10, 255],
    [10, 10, 255],
    [10, 10, 255]
];

// 2. [필터 설계] 세로선을 찾는 2x2 필터 (Vertical Edge Filter)
// 필터의 숫자 구성에 따라 가로선, 세로선, 대각선 등 찾는 특징이 달라집니다.
const filter = [
    [1, -1],
    [1, -1]
];

/**
 * [함수] 합성곱(Convolution) 연산 시뮬레이션
 * - 역할: 필터를 이미지 위에 올려두고 대응하는 숫자끼리 곱해서 모두 더합니다.
 */
function applyConvolution(image, kernel) {
    console.log("🔍 이미지 특징 추출(Convolution) 시작...");

    // 결과가 저장될 2x2 크기의 배열 (3x3 이미지에 2x2 필터를 적용하면 크기가 줄어듭니다)
    let output = [
        [0, 0],
        [0, 0]
    ];

    // 이중 for문을 사용하여 이미지의 행(y)과 열(x)을 순회합니다.
    for (let y = 0; y < 2; y++) {
        for (let x = 0; x < 2; x++) {

            // 필터 범위만큼의 숫자를 곱해서 더함 (핵심 연산)
            let sum = 0;
            sum += image[y][x] * kernel[0][0];         // 필터 왼쪽 위
            sum += image[y][x + 1] * kernel[0][1];     // 필터 오른쪽 위
            sum += image[y + 1][x] * kernel[1][0];     // 필터 왼쪽 아래
            sum += image[y + 1][x + 1] * kernel[1][1]; // 필터 오른쪽 아래

            output[y][x] = sum;
            console.log(` - 위치 [${y}, ${x}] 특징값: ${sum}`);
        }
    }
    return output;
}

/**
 * [메인 실행 로직]
 */
async function runCnnDemo() {
    console.log("========================================");
    console.log("🖼️ CNN 이미지 특징 추출 엔진 가동");
    console.log("========================================");

    // 1초 대기 (비동기 처리 습관화)
    await new Promise(res => setTimeout(res, 1000));

    const featureMap = applyConvolution(inputImage, filter);

    console.log("\n----------------------------------------");
    console.log("✅ 특징 추출 완료 (Feature Map):");
    // 출력 결과에서 값이 큰 부분이 필터가 찾고자 하는 특징(세로선)이 있는 곳입니다.
    console.table(featureMap);
    console.log("----------------------------------------");
    console.log("💡 Tip: 값이 크게 나타난 곳이 '경계선'이 발견된 지점입니다.");
    console.log("========================================");
}

runCnnDemo();

/**
 * [ 🛠️ 엔지니어링 분석 리포트 (Engineering Insight) ]
 * * 1. 특징 맵(Feature Map):
 * - 필터를 거쳐 나온 결과물을 말합니다. 원본 이미지보다 크기가 작아진 것을 볼 수 있습니다.
 * * 2. 패딩(Padding)과 스트라이드(Stride):
 * - 실무에서는 이미지 크기가 줄어드는 걸 막기 위해 가장자리에 0을 채우거나(Padding), 
 * - 필터를 몇 칸씩 건너뛰며 이동할지(Stride) 결정하여 성능을 조절합니다.
 * * 3. 재발 방지 팁: 
 * - 이미지 인식률이 낮다면 필터의 개수를 늘려 다양한 특징(색상, 질감, 선 등)을 뽑아내야 합니다.
 */