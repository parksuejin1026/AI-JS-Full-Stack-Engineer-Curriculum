/**
 * [ PART II. JS Interface & AI Inference ]
 * Chapter 06. TensorFlow.js 실전 연동
 * * 주요 로직: 텐서 생성, GPU 연산, 그리고 가장 중요한 '메모리 해제'
 */

// 실제 환경에서는 <script src="...tf.min.js"> 또는 npm install @tensorflow/tfjs 필요
// 여기서는 시뮬레이션 환경으로 핵심 로직을 작성합니다.

async function runTensorFlowDemo() {
    console.log("🚀 TensorFlow.js 엔진 가동 및 GPU(WebGL) 체크 중...");

    /**
     * [Step 1]: 텐서(Tensor) 생성
     * 텐서는 AI가 이해하는 다차원 배열입니다. 
     * 일반 배열을 tf.tensor()로 감싸서 GPU로 보냅니다.
     */
    const data = [1, 2, 3, 4];

    // tf.tidy()는 이 내부에서 생성된 모든 임시 텐서를 
    // 함수 실행이 끝나자마자 메모리에서 자동으로 삭제해줍니다. (메모리 관리의 핵심!)
    const result = tf.tidy(() => {
        const input = tf.tensor1d(data); // 1차원 텐서 생성
        const weight = tf.scalar(1.5);    // 가중치 스칼라 값 생성

        console.log("🔍 [연산 중]: y = x * weight");

        // GPU를 사용한 행렬 연산 발생
        const output = input.mul(weight);

        return output; // 결과값만 밖으로 내보내고 나머지는 정리됨
    });

    /**
     * [Step 2]: 결과 확인
     * GPU에 있는 데이터를 다시 JS 배열로 가져옵니다 (dataSync).
     */
    const finalArray = result.dataSync();
    console.log("✅ 연산 결과:", finalArray);

    /**
     * [Step 3]: 명시적 메모리 해제
     * tidy() 밖에서 살아남은 최종 결과 텐서도 사용이 끝나면 버려야 합니다.
     */
    result.dispose();
    console.log("\n📦 GPU 메모리 정리 완료 (Memory Cleaned)");
}

/**
 * [ 🛠️ 에러 분석 및 재발 방지 가이드 (Debugging) ]
 * * 1. 원인 분석 (Root Cause):
 * - 사용자가 고해상도 이미지를 실시간으로 분석할 때, tf.dispose()를 깜빡하면 
 * GPU 메모리가 수 초 내에 수 GB를 점유하여 'Out of Memory' 에러가 발생함.
 * * 2. 재발 방지 팁 (Best Practice):
 * - 루프(for, while) 안에서 텐서를 생성할 때는 무조건 'tf.tidy()'를 사용하세요.
 * - 전역 변수로 텐서를 선언하지 말고, 필요한 시점에 생성하고 바로 dispose 하세요.
 */

runTensorFlowDemo();

/*
[ 실행 환경 및 복잡도 ]
- 환경: Browser with WebGL Support
- 시간 복잡도: O(N) (N은 데이터의 크기, GPU 병렬 연산으로 CPU보다 압도적으로 빠름)
*/