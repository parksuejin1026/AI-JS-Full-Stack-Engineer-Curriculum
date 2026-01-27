# 🤖 AI & JS Full-Stack Engineering Archive (Enhanced)

인공지능 소프트웨어 전공자로서 AI 모델 설계부터 서비스 배포까지의 전 과정을 심화 학습하는 저장소입니다. 단순 구현을 넘어 **'왜 이렇게 동작하는가?'**에 대한 해답을 찾고, **'어떻게 최적화할 것인가?'**를 고민합니다.

---

## 📌 학습 원칙 (Engineering Principles)

* **Principle 1. Zero-Inference (Deep Dive):** 라이브러리 함수 하나도 수학적 근거를 이해하고 사용한다.
* **Principle 2. Resource-Aware Coding:** 메모리 레이아웃(C/F-Style)과 CPU/GPU 활용도를 고려한 코드를 작성한다.
* **Principle 3. Robust Engineering:** 에러 발생 시 원인 분석(Root Cause Analysis)과 재발 방지 대책을 문서화한다.
* **Principle 4. Full-Stack Synergy:** AI 모델의 출력이 사용자 UI에 전달되는 비동기 흐름을 최적화한다.

---

## 📚 커리큘럼 로드맵 (Enhanced Chapters)

### 🟦 PART I. AI Fundamentals & Data Mathematics
*데이터의 본질을 파악하고 수치 연산의 효율성을 극대화하는 단계*

* **Chapter 01. 선형대수와 텐서 (Linear Algebra):** 텐서 구조, 행렬 곱셈 $O(n^3)$ 직접 구현, 메모리 레이아웃(Row-major) 분석.
* **Chapter 02. 데이터 엔지니어링 실무:** Pandas Block Manager 이해, 다운캐스팅 및 카테고리화, 벡터화 연산 최적화.
* **Chapter 03. 미분과 자동 미분(Autograd):** 연쇄 법칙 기반 역전파 수식 증명 및 NumPy 기반 간단한 Autograd 엔진 구현.

### 🟨 PART II. Machine Learning & JS Interface
*정적 모델을 동적 서비스로 전환하는 기술*

* **Chapter 04. JS 비동기 AI 파이프라인:** Event Loop 심화, Web Worker를 이용한 Heavy AI 연산 분리.
* **Chapter 05. ML 수학적 설계 및 평가:** 손실 함수 수식 분석 및 Scikit-learn 모델의 JS 이식 전략.
* **Chapter 06. TensorFlow.js & WebGL 가속:** 브라우저 GPU 활용 최적화 및 모델 경량화(Graph Optimization).

### 🟥 PART III. Deep Learning & MLOps
*거대 모델 운영과 엣지 디바이스 배포*

* **Chapter 07. DNN & Backpropagation:** 가중치 초기화(Xavier/He) 전략 및 Batch Norm의 수학적 효과 분석.
* **Chapter 08. 아키텍처 심화 (CNN/Transformer):** Attention Score 직접 계산 및 Pre-trained 모델의 전이 학습.
* **Chapter 09. Mobile AI & Quantization:** React Native 환경 내 TFLite 배포 및 양자화(INT8) 성능 분석.
* **Chapter 10. Full-Stack MLOps:** FastAPI/Next.js 기반 실시간 추론 시스템 및 Docker 기반 CI/CD 구축.

---
## 🛠 실행 및 기록 가이드
- **Deep Dive Note**: 로직 하단에 반드시 시간/공간 복잡도 명시.
- **Debugging Report**: 발생한 에러와 해결 과정(Solution)을 상세히 기록.