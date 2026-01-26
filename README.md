# 🤖 AI & JS Full-Stack Engineering Archive

인공지능 소프트웨어 전공자로서 AI 모델 설계부터 웹/모바일 서비스 배포까지의 전 과정을 심화 학습하는 저장소입니다. 각 Chapter는 단순 활용을 넘어 동작 원리 이해와 실무 최적화(Deep Dive)를 목표로 합니다.

---

## 📌 학습 원칙 (Engineering Principles)

* **Principle 1. Deep Dive:** 라이브러리 뒤에 숨겨진 수학적 원리와 알고리즘을 파헤친다.
* **Principle 2. Clean Code:** 가독성, 효율성, 유지보수성을 고려하여 최신 문법(Best Practice)을 적용한다.
* **Principle 3. Root Cause Analysis:** 에러 발생 시 수정 코드뿐만 아니라 원인 분석과 재발 방지 팁을 기록한다.
* **Principle 4. Performance:** 시간/공간 복잡도를 분석하고 하드웨어 가속(GPU/NPU) 및 메모리 최적화 방안을 고려한다.

---

## 📚 커리큘럼 로드맵 (Chapters)

### 🟦 PART I. AI Fundamentals & Data Mathematics
*AI의 엔진이 되는 수학적 기초와 데이터 처리 능력을 배양합니다.*

* **Chapter 01. 선형대수와 텐서 (Linear Algebra)**
    * 스칼라, 벡터, 행렬, 텐서의 차원 개념 및 메모리 배치(C/F-Contiguous) 이해.
    * 행렬 곱셈의 수학적 원리 및 3중 for문 직접 구현 ($O(n^3)$ 분석).
    * NumPy를 활용한 벡터화(Vectorization) 및 브로드캐스팅(Broadcasting) 성능 최적화.
* **Chapter 02. 데이터 엔지니어링 실무 (Pandas & Data Handling)**
    * 대용량 데이터 로딩 시 `dtype` 최적화 및 인덱싱 아키텍처 분석.
    * 데이터 정제(Cleaning), 결측치 처리, 피처 엔지니어링 및 EDA 전략.
* **Chapter 03. 미분과 최적화 (Optimization)**
    * 연쇄 법칙(Chain Rule) 기반의 미분 원리 이해.
    * 경사하강법(Gradient Descent) 구현 및 다양한 옵티마이저(Adam, RMSProp) 수식 분석.

### 🟨 PART II. Machine Learning & JS Interface
*AI 모델을 학습시키고, 이를 실제 서비스와 연결하는 기술을 다룹니다.*

* **Chapter 04. JS 비동기 프로그래밍 및 AI API 연동**
    * Event Loop 기반 비동기 처리(Promise, async/await) 심화 및 비동기 병목 해결.
    * OpenAI, HuggingFace API 연동 및 스트리밍(SSE) 처리를 통한 인터랙티브 UI 구현.
* **Chapter 05. 머신러닝 알고리즘 (Supervised Learning)**
    * 회귀(Regression)와 분류(Classification) 모델의 수학적 설계.
    * 손실 함수(Loss Function) 및 성능 평가 지표(F1, ROC-AUC)의 실무적 해석.
* **Chapter 06. TensorFlow.js 웹 서비스 배포**
    * 브라우저 환경에서의 모델 로딩 및 WebGL 가속 활용.
    * Web Worker를 이용한 메인 스레드 비차단 연산 및 실시간 객체 탐지 UI/UX 구현.

### 🟥 PART III. Deep Learning & MLOps
*복잡한 신경망 구조를 이해하고 실무 환경에 배포하는 고급 과정을 다룹니다.*

* **Chapter 07. 심층 신경망 (Deep Neural Networks)**
    * MLP 아키텍처 설계와 역전파(Backpropagation) 알고리즘의 수식적 증명.
    * 기울기 소실(Gradient Vanishing) 문제 분석 및 Batch Normalization 적용.
* **Chapter 08. 현대적 AI 아키텍처 (CNN & Transformer)**
    * Convolution 연산의 시각적 원리와 Self-Attention 메커니즘 직접 계산.
    * 사전 학습된 모델(ViT, BERT)의 파인튜닝(Fine-tuning) 및 전이 학습.
* **Chapter 09. Edge AI 및 모바일 최적화 (Mobile AI)**
    * React Native 환경에서의 AI 모델 탑재 및 전용 엔진 실행.
    * 모델 경량화(Quantization)를 통한 용량 절감 및 디바이스 내 추론 성능 최적화.
* **Chapter 10. MLOps 및 최종 프로젝트 (Deployment)**
    * FastAPI와 Next.js를 결합한 마이크로서비스 아키텍처 구축.
    * Docker 컨테이너화 및 CI/CD 파이프라인을 통한 Full-Stack 서비스 완성.

---
## 🛠 실행 가이드
- **환경**: VS Code, Jupyter Notebook (.ipynb)
- **언어**: Python (AI Core), JavaScript/TypeScript (Full-Stack)
- **노트 작성**: 각 로직 아래 시간 복잡도와 실행 환경 명시 필수.