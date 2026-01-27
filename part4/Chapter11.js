/**
 * [ PART IV. Advanced Engineering ]
 * Chapter 11. Full-Stack Integration (AI 서비스 서버 구현)
 * * 상세 주석: Node.js 환경에서 AI 모델을 서비스하기 위한 백엔드 로직을 구현합니다.
 */

// 1. [가상 프레임워크 설계] Express.js 스타일의 서버 시뮬레이션
const aiServer = {
    // 서버에 로드된 가상의 학습된 모델 (Chapter 07, 08의 결과물)
    loadedModel: {
        predict: (data) => {
            console.log("🤖 AI 모델: 데이터 분석 중...");
            // 실제로는 여기서 텐서 연산이 일어납니다.
            return data > 0.5 ? "인식 성공: 고양이" : "인식 성공: 강아지";
        }
    },

    /**
     * 2. API 엔드포인트: 이미지 분석 요청 처리
     * @param {Object} request - 클라이언트로부터 받은 데이터
     */
    handleInferenceRequest: async function (request) {
        console.log("\n[Server]: 분석 요청 수신...");

        try {
            // [전처리 단계]: 클라이언트가 보낸 원본 데이터를 모델이 이해할 숫자로 변환
            // 수진 님이 배운 데이터 정규화 과정입니다.
            const rawData = request.payload;
            const normalizedData = rawData / 255;

            // 비동기 AI 추론 (Inference)
            await new Promise(res => setTimeout(res, 500));
            const result = this.loadedModel.predict(normalizedData);

            return {
                status: 200,
                prediction: result,
                confidence: 0.98,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            return { status: 500, message: "Internal AI Error" };
        }
    }
};

/**
 * 3. 클라이언트(모바일/브라우저) 통신 시뮬레이션
 */
async function startFullStackDemo() {
    console.log("🚀 AI 풀스택 서비스 통합 테스트 시작...");

    // 클라이언트가 서버에 보낼 가상의 이미지 픽셀 데이터
    const clientRequest = {
        payload: 200, // 가상의 이미지 데이터
        userId: "Sujin_Park_08"
    };

    // 서버 API 호출
    const response = await aiServer.handleInferenceRequest(clientRequest);

    console.log("----------------------------------------");
    console.log("📱 [Client]: 서버로부터 결과 수신 완료!");
    console.log(`📡 결과: ${response.prediction} (신뢰도: ${response.confidence * 100}%)`);
    console.log("----------------------------------------");
}

/**
 * [ 🛠️ 디버깅 가이드: 시간 초과 (Timeout Issue) ]
 * * 1. 현상: 클라이언트가 요청을 보냈는데 응답이 너무 늦어 앱이 멈춤.
 * * 2. 원인 분석: AI 추론(Inference)은 무거운 연산이라 메인 서버 스레드를 점유할 수 있음.
 * * 3. 재발 방지 팁: 
 * - 서버에서 'Worker Threads'를 사용하여 AI 연산을 별도로 처리하세요.
 * - 응답이 오래 걸릴 경우 '진행률(Progress Bar)'을 보내거나 비동기 큐(Queue)를 도입하세요.
 */

startFullStackDemo();

/*
[ 실행 리포트 ]
- 동작 원리: 클라이언트(Data) -> 서버(Pre-process) -> 모델(Predict) -> 클라이언트(Result)
- 시간 복잡도: O(Inference_Time + Network_Latency)
*/