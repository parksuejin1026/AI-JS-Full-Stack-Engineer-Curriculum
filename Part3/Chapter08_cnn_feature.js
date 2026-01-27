/**
 * [ PART III. Deep Learning Architecture ]
 * Chapter 08. CNN & 이미지 특징 추출 기술
 * * 상세 주석: 2차원 배열(이미지)에서 특징을 뽑아내는 필터 연산을 구현합니다.
 */

// 1. [데이터 설계] 가상의 4x4 이미지 데이터 (단순화된 픽셀값)
const image = [
    [10, 10, 10, 10],
    [10, 255, 255, 10],
    [10, 255, 255, 10],
    [10, 10, 10, 10]
];

// 2. [필터 설계] 사물의 '경계선'을 찾는 3x3 소벨 필터(Sobel Filter) 예시
const filter = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1]
];

/**
 * 3. [함수] 합성곱(Convolution) 엔진
 * @param {Array} img - 원본 이미지
 * @param {Array} flt - 필터(커널)
 */
function applyConvolution(img, flt) {
    const size = img.length;
    const fSize = flt.length;
    const outputSize = size - fSize + 1; // 연산 후 결과 데이터의 크기

    // 결과값을 담을 2차원 배열 생성
    let featureMap = Array.from({ length: outputSize }, () => Array(outputSize).fill(0));

    console.log("🔍 필터가 이미지 특징을 스캔 중입니다...");

    for (let i = 0; i < outputSize; i++) {
        for (let j = 0; j < outputSize; j++) {
            let sum = 0;
            // 3x3 필터 영역만큼 곱해서 더하기 (Dot Product)
            for (let fi = 0; fi < fSize; fi++) {
                for (let fj = 0; fj < fSize; fj++) {
                    sum += img[i + fi][j + fj] * flt[fi][fj];
                }
            }
            featureMap[i][j] = sum;
        }
    }
    return featureMap;
}

/**
 * 4. 메인 실행 로직
 */
async function analyzeImage() {
    console.log("🖼️ CNN 이미지 분석 프로세스 가동");

    await new Promise(res => setTimeout(res, 1000)); // 실무 지연 시뮬레이션

    const result = applyConvolution(image, filter);

    console.log("\n----------------------------------------");
    console.log("✅ 특징 맵(Feature Map) 생성 완료:");
    console.table(result); // 특징이 발견된 곳의 수치가 크게 나타남
    console.log("----------------------------------------");
}

/**
 * [ 🛠️ 에러 분석: 데이터 차원 불일치 (Shape Mismatch) ]
 * * 1. 원인 분석: 이미지 크기보다 필터 크기가 더 크면 연산이 불가능하여 에러 발생.
 * * 2. 재발 방지 팁: 연산 전에 `if (img.length < flt.length)` 체크 로직을 넣거나, 
 * 이미지 테두리에 'Padding'을 추가하여 크기를 맞추는 전처리 과정을 거치세요.
 */

analyzeImage();

/*
[ 실행 리포트 ]
- 동작 원리: 필터 속의 숫자(가중치)와 이미지 픽셀이 만나 '모양'을 수치화함.
- 시간 복잡도: O(Image_Size^2 * Filter_Size^2)
*/