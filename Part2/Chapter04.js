/**
 * [ PART II. Machine Learning & JS Interface ]
 * Chapter 04. JS 비동기 프로그래밍 및 AI API 연동
 * * 학습 목표: AI 서버와의 통신처럼 시간이 걸리는 작업을 
 * 화면 멈춤 없이 처리하는 비동기(Asynchronous) 로직을 마스터합니다.
 */

/**
 * 1. AI 응답 시뮬레이션 함수 (Promise 엔진)
 * @param {string} question - 사용자로부터 받은 질문
 * @returns {Promise} 2초 후에 결과를 돌려주겠다는 '약속 상자'를 반환
 */
function callAiApi(question) {
    // Promise는 자바스크립트 비동기의 핵심 객체입니다.
    // resolve: 작업 성공 시 실행할 함수
    // reject: 작업 실패 시 실행할 함수
    return new Promise((resolve, reject) => {
        console.log(`\n[시스템]: AI 서버에 "${question}" 질문을 전송 중...`);

        // setTimeout은 브라우저/Node.js의 내장 기능으로, 설정한 시간(ms) 뒤에 실행됩니다.
        // 실제 AI API(OpenAI 등) 호출 시 발생하는 네트워크 대기 시간을 시뮬레이션합니다.
        setTimeout(() => {
            const isServerOnline = true; // 서버 상태 가정

            if (isServerOnline) {
                // 성공 시: 결과 데이터를 resolve에 담아 보냅니다.
                resolve({
                    status: 200,
                    data: `AI 답변: '${question}'에 대한 분석 결과, 학습률 최적화가 필요합니다.`
                });
            } else {
                // 실패 시: 에러 객체를 reject에 담아 보냅니다.
                reject(new Error("AI 서버가 응답하지 않습니다. (Timeout)"));
            }
        }, 2000); // 2000ms = 2초 대기
    });
}

/**
 * 2. 서비스 실행 메인 로직 (Async/Await)
 * 비동기 코드를 파이썬처럼 위에서 아래로 순차적으로 읽히게 만드는 최신 문법입니다.
 */
async function runAiService() {
    try {
        console.log("========================================");
        console.log("🚀 AI 분석 서비스 가동");
        console.log("========================================");

        // [동작 원리]: await 키워드는 callAiApi가 끝날 때까지 기다립니다.
        // 하지만 이 기다리는 동안 프로그램 전체가 멈추는 것이 아니라, 
        // 다른 이벤트(클릭 등)를 처리할 수 있는 상태를 유지합니다.
        const response = await callAiApi("경사하강법의 원리");

        // 성공적으로 데이터를 받았을 때 실행됩니다.
        console.log("✅ 분석 완료!");
        console.log(`📩 결과 수신: ${response.data}`);

    } catch (error) {
        // [Root Cause Analysis]: 에러 발생 시 원인을 출력합니다.
        console.error("----------------------------------------");
        console.error(`❌ 서비스 에러 발생: ${error.message}`);
        console.error("재발 방지 팁: API 서버의 상태를 체크하거나 네트워크 설정을 확인하세요.");
        console.error("----------------------------------------");
    } finally {
        console.log("\n========================================");
        console.log("🏁 서비스 종료");
        console.log("========================================");
    }
}

// 최종 실행
runAiService();

/**
 * [ 🛠️ 엔지니어링 리포트 (Engineering Insight) ]
 * * 1. 실행 방법: 터미널에서 'node chapter04.js' 입력.
 * 2. 비동기 처리의 이유: 
 * - 만약 동기(Synchronous) 방식으로 2초를 기다리면, 웹사이트의 모든 버튼이 2초간 작동하지 않습니다.
 * - 비동기 방식을 통해 "데이터는 나중에 받을게, 다른 일 먼저 하고 있어"라고 지시하는 것입니다.
 * 3. 시간 복잡도: O(1) (단일 비동기 이벤트 루프)
 * 4. 실행 환경: Node.js 16.x 이상 권장
 */