/**
 * [ PART III. Deep Learning Architecture ]
 * Chapter 09. RNN 기초 및 순차 데이터 처리
 * * 상세 주석: 이전 시점의 기억(Hidden State)을 유지하며 데이터를 처리하는 로직을 구현합니다.
 */

/**
 * 1. [데이터 설계] 간단한 시계열 데이터
 * AI가 시간에 따라 변하는 3개의 신호를 순서대로 읽는다고 가정합니다.
 */
const timeSeriesData = [0.1, 0.5, 0.9]; // 시간 흐름에 따른 입력값

/**
 * 2. [클래스 설계] RNN 셀(Cell) 시뮬레이터
 */
class RNNCell {
    constructor() {
        this.hiddenState = 0;   // 과거의 기억을 담는 '메모리' (초기값 0)
        this.w_input = 0.5;     // 현재 입력에 대한 가중치
        this.w_hidden = 0.8;    // 이전 기억에 대한 가중치
    }

    /**
     * 데이터를 하나씩 처리하며 기억을 업데이트합니다.
     * @param {number} input - 현재 시점의 입력값
     */
    process(input) {
        console.log(`\n📥 현재 입력: ${input} | 🧠 이전 기억: ${this.hiddenState.toFixed(4)}`);

        // RNN의 핵심 공식: Hidden = tanh( (입력 * 가중치) + (과거기억 * 가중치) )
        // Math.tanh는 결과를 -1 ~ 1 사이로 잡아주어 기억이 폭주하는 것을 막습니다.
        const nextHidden = Math.tanh((input * this.w_input) + (this.hiddenState * this.w_hidden));

        // 새로운 기억으로 교체
        this.hiddenState = nextHidden;

        return this.hiddenState;
    }
}

/**
 * 3. 메인 실행 로직
 */
async function startRNN() {
    console.log("📜 RNN 문맥 분석 엔진 가동...");
    const myRNN = new RNNCell();

    for (let i = 0; i < timeSeriesData.length; i++) {
        const memory = myRNN.process(timeSeriesData[i]);

        await new Promise(res => setTimeout(res, 800)); // 흐름을 보기 위한 딜레이
        console.log(` ✅ 업데이트된 현재 기억: ${memory.toFixed(4)}`);
    }

    console.log("\n----------------------------------------");
    console.log("🎯 최종 문맥 파악 완료: 마지막 메모리 상태가 전체 흐름을 요약합니다.");
    console.log("----------------------------------------");
}

/**
 * [ 🛠️ 에러 분석: 기울기 소실 (Vanishing Gradient) ]
 * * 1. 현상: 문장이 너무 길어지면 초기 단어의 정보가 뒤로 갈수록 사라짐.
 * * 2. 원인 분석: tanh를 반복해서 곱하다 보니 앞쪽의 영향력이 거의 0에 수렴하게 됨.
 * * 3. 재발 방지 팁: 이 문제를 해결하기 위해 '중요한 것만 골라 기억하는' 
 * LSTM(Long Short-Term Memory)이나 GRU 구조를 실무에선 주로 사용합니다.
 */

startRNN();

/*
[ 실행 리포트 ]
- 동작 원리: input과 hiddenState가 서로 엮여 새로운 hiddenState를 만드는 '순환' 구조.
- 시간 복잡도: O(Sequence_Length)
*/