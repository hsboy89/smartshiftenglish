import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { text, type, level } = await req.json();

        // Artificial delay to simulate AI processing
        await new Promise((resolve) => setTimeout(resolve, 2500));

        // Generate a list of questions instead of just one
        const results = [
            {
                id: "Q1",
                type: "빈칸 추론 (Blank Filling)",
                question: "The rise of digital technology has fundamentally altered the way we consume information. In the past, people relied on physical newspapers and broadcast television for news. However, the current landscape is dominated by social media and real-time updates. This shift has led to ___________, as users are now exposed to a constant stream of bite-sized content rather than in-depth reporting.",
                options: [
                    "a decrease in the speed of news delivery",
                    "a growing preference for shallow engagement",
                    "an increase in the cost of long-form journalism",
                    "the revival of traditional reading habits"
                ],
                answer: "a growing preference for shallow engagement",
                explanation: "지문은 디지털 기술의 발달로 인해 심층 보도보다는 짧은 콘텐츠에 노출되는 상황을 설명하며, 이는 '얕은 참여'로 이어짐을 의미합니다.",
                structure: { intro: "출판물 시대의 유물", body: "디지털 기기와 실시간 정보 수신의 일상화", conc: "심층 보도 실종 및 얕은 정보 소비 확산" }
            },
            {
                id: "Q2",
                type: "문장 삽입 (Sentence Insertion)",
                question: "[Sentence to insert]: 'This realization eventually led to the development of more sustainable agricultural practices.'\n\n(1) For decades, farmers focused solely on maximizing crop yields through the heavy use of chemical fertilizers. (2) While this approach initially produced impressive results, it gradually depleted the soil's natural nutrient levels. (3) Environmental scientists warned that such methods were not viable in the long term. (4) Today, these eco-friendly methods are being adopted by major food producers across the globe.",
                answer: "(4)",
                explanation: "3번 문장에서 과학자들이 장기적으로 생존 불가능하다고 경고한 내용이 '깨달음(This realization)'에 해당하며, 4번 문장에서 '이러한 친환경 농법'이 언급되므로 그 사이인 4번 자리가 정답입니다.",
                structure: { intro: "화학 비료 중심의 농업", body: "토양 질 저하 및 환경 단체의 경고", conc: "친환경/지속가능한 농법으로의 패러다임 전환" }
            },
            {
                id: "Q3",
                type: "글의 순서 (Logical Order)",
                question: "(A) Similarly, some studies show that students who get enough sleep perform better in exams compared to those who don't. \n(B) It is important to understand the role of sleep in cognitive function. During sleep, the brain processes the information acquired during the day. \n(C) Therefore, consistency in sleep patterns is a key factor in academic success.",
                options: ["(A)-(C)-(B)", "(B)-(A)-(C)", "(C)-(B)-(A)", "(B)-(C)-(A)"],
                answer: "(B)-(A)-(C)",
                explanation: "수면의 역할(B)을 먼저 제시하고, 구체적인 연구 결과(A)를 덧붙인 뒤, 결론(C)으로 마무리하는 것이 가장 논리적입니다.",
                structure: { intro: "수면의 인지적 역할 정의", body: "수면과 학업 성적의 상관관계 통계", conc: "일관된 수면 패턴의 중요성 강조" }
            },
            {
                id: "Q4",
                type: "주제/제목 찾기",
                question: "Many schools are now integrating coding into their core curriculum. They believe that computational thinking is just as important as reading and writing in the modern world. By learning to code, students develop problem-solving skills and learn how to break complex tasks into smaller, manageable parts. This preparation is essential for future careers in a tech-driven economy.",
                options: [
                    "The history of computer science",
                    "Why coding is essential in modern education",
                    "The difficulty of teaching math in schools",
                    "How to become a professional developer"
                ],
                answer: "Why coding is essential in modern education",
                explanation: "학교에서 코딩 교육을 필수화하는 이유와 그로 인한 학생들의 기술 함양에 대해 설명하고 있는 글입니다.",
                structure: { intro: "정규 교과 내 코딩 도입 열풍", body: "컴퓨팅 사고력의 교육적 가치 분석", conc: "미래 직업 시장을 위한 필수적 준비 과정" }
            }
        ];

        return NextResponse.json({
            success: true,
            data: results
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Processing failed" }, { status: 500 });
    }
}
