"use client";

import { useState } from "react";
import styles from "./AiFeatures.module.css";
import {
    Zap,
    Camera,
    Trash2,
    Share2,
    Download,
    X,
    Network,
    Maximize2,
    CheckCircle2,
    Copy,
    Layout,
    BookOpen,
    FileText
} from "lucide-react";
import { Button } from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

interface QuestionResult {
    id: string;
    type: string;
    question: string;
    options?: string[];
    answer: string;
    explanation: string;
    structure?: {
        intro: string;
        body: string;
        conc: string;
    };
}

const QUESTION_TYPES = [
    "빈칸 추론", "문장 삽입", "글의 순서", "주제/제목", "어휘/어법", "요약문 완성"
];

export function AiFeatures() {
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOcrLoading, setIsOcrLoading] = useState(false);
    const [results, setResults] = useState<QuestionResult[]>([]);
    const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>(["빈칸 추론", "문장 삽입", "글의 순서", "주제/제목"]);
    const [pdfTemplate, setPdfTemplate] = useState<"standard" | "exam">("exam");
    const [isDownloading, setIsDownloading] = useState(false);
    const pdfRef = useRef<HTMLDivElement>(null);

    const handleOcrSim = () => {
        setIsOcrLoading(true);
        setTimeout(() => {
            setInputText(
                "The recent advancement in artificial intelligence has sparked widespread debate across various sectors. While proponents argue that AI can significantly enhance productivity and solve complex problems, critics express concerns regarding job displacement and ethical implications. Scholars suggest that a balanced approach, incorporating both innovation and regulation, is essential for a sustainable future."
            );
            setIsOcrLoading(false);
        }, 2000);
    };

    const handleGenerate = async () => {
        if (!inputText) return;
        setIsLoading(true);
        setResults([]);
        setSelectedIds([]);

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                body: JSON.stringify({
                    text: inputText,
                    types: selectedTypes
                }),
            });
            const data = await response.json();
            if (data.success) {
                // Filter mock results based on selection for demo purposes
                const filtered = data.data.filter((r: any) =>
                    selectedTypes.some(t => r.type.includes(t))
                );
                setResults(filtered.length > 0 ? filtered : data.data);
            }
        } catch (error) {
            console.error("Generation failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleType = (type: string) => {
        setSelectedTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const toggleSelection = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const selectedQuestions = results.filter(r => selectedIds.includes(r.id));

    const handleCopyToClipboard = () => {
        const text = selectedQuestions.map((q, i) =>
            `[문제 ${i + 1}] (${q.type})\n\n${q.question}\n\n${q.options ? q.options.map((o, oi) => `(${oi + 1}) ${o}`).join("  ") : ""}\n\n정답: ${q.answer}\n해설: ${q.explanation}\n`
        ).join("\n" + "=".repeat(40) + "\n\n");
        navigator.clipboard.writeText(text);
        alert(`${selectedQuestions.length}개의 문제가 한글(HWP)/Word 최적화 포맷으로 복사되었습니다.`);
    };

    const handleDownloadPdf = async () => {
        if (!pdfRef.current) return;
        setIsDownloading(true);

        try {
            const element = pdfRef.current;
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: "#ffffff",
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`SmartShift_Worksheet_${new Date().toISOString().slice(0, 10)}.pdf`);
        } catch (error) {
            console.error("PDF generation failed:", error);
            alert("PDF 생성 중 오류가 발생했습니다.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <section id="generator" className={styles.section}>
            <div className="container">
                <motion.h2
                    className={styles.headline}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    설계는 AI가, <span className="text-primary">적중은 원장님이</span>
                </motion.h2>
                <motion.p
                    className={styles.subheadline}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    지문 분석부터 변형 문제 생성까지 단 몇 초면 완성됩니다.<br />
                    이제 원장님만의 시그니처 시험지를 무제한으로 제작하고 출력하세요.
                </motion.p>

                <div className={styles.interface}>
                    {/* Input Card */}
                    <motion.div
                        className={styles.card}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <AnimatePresence>
                            {isOcrLoading && (
                                <motion.div
                                    className={styles.ocrOverlay}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className={styles.scanner}></div>
                                    <p className="font-bold text-blue-600">지문 스캔 중...</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className={styles.cardHeader}>
                            <div className={styles.headerTitle}>
                                <Zap size={20} fill="currentColor" />
                                지문 입력
                            </div>
                            <button className={styles.ocrButton} onClick={handleOcrSim}>
                                <Camera size={14} />
                                사진으로 입력
                            </button>
                        </div>

                        <textarea
                            className={styles.textarea}
                            placeholder="영어 지문을 입력하거나 사진을 업로드하세요..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                        />

                        <label className={styles.label}>생성할 문제 유형 선택</label>
                        <div className={styles.typeSelector}>
                            {QUESTION_TYPES.map(type => (
                                <button
                                    key={type}
                                    className={`${styles.typeChip} ${selectedTypes.includes(type) ? styles.typeChipActive : ""}`}
                                    onClick={() => toggleType(type)}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>

                        <div className={styles.controls}>
                            <div>
                                <label className={styles.label}>지문 유형</label>
                                <select className={styles.select}>
                                    <option>모의고사/수능</option>
                                    <option>교과서</option>
                                    <option>EBS 연계</option>
                                    <option>외부 지문</option>
                                </select>
                            </div>
                            <div>
                                <label className={styles.label}>난이도</label>
                                <select className={styles.select}>
                                    <option>고3 수준</option>
                                    <option>고2 수준</option>
                                    <option>고1 수준</option>
                                </select>
                            </div>
                        </div>

                        <Button
                            size="lg"
                            fullWidth
                            onClick={handleGenerate}
                            isLoading={isLoading}
                        >
                            {isLoading ? "AI 변형 문제 세트 생성 중..." : `문제 세트 만들기 (${selectedTypes.length}유형)`}
                        </Button>
                    </motion.div>

                    {/* Results Area */}
                    <div className={styles.resultsArea}>
                        {!isLoading && results.length === 0 && (
                            <div className={styles.emptyState}>
                                <Layout size={48} strokeWidth={1} style={{ opacity: 0.3 }} />
                                <p>지문을 입력하고 유형을 골라보세요.</p>
                            </div>
                        )}

                        {isLoading && (
                            <div className={styles.emptyState}>
                                <div className={styles.spinner}></div>
                                <p>AI가 선정하신 {selectedTypes.length}가지 유형의 문제를 설계 중입니다...</p>
                            </div>
                        )}

                        <AnimatePresence>
                            {results.length > 0 && (
                                <motion.div
                                    className={styles.resultsList}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {results.map((res, index) => (
                                        <motion.div
                                            key={res.id}
                                            className={`${styles.resultCard} ${selectedIds.includes(res.id) ? styles.resultCardSelected : ""}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <div className={styles.selectionBox}>
                                                <input
                                                    type="checkbox"
                                                    className={styles.checkbox}
                                                    checked={selectedIds.includes(res.id)}
                                                    onChange={() => toggleSelection(res.id)}
                                                />
                                            </div>

                                            <div className={styles.resultHeader}>
                                                <span className={styles.resultType}>{res.type}</span>
                                            </div>

                                            <div className={styles.question}>{res.question}</div>

                                            {res.options && (
                                                <div className={styles.optionsList}>
                                                    {res.options.map((opt, i) => (
                                                        <div key={i} className={styles.option}>{i + 1}. {opt}</div>
                                                    ))}
                                                </div>
                                            )}

                                            <div className={styles.answerBox}>
                                                <div className={styles.answerTitle}>
                                                    <CheckCircle2 size={16} /> 정답 및 분석
                                                </div>
                                                <div className="font-bold mb-1">정답: {res.answer}</div>
                                                <p className={styles.explanation}>{res.explanation}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Floating Action Bar */}
            <AnimatePresence>
                {selectedIds.length > 0 && (
                    <motion.div
                        className={styles.actionBar}
                        initial={{ y: 100, x: "-50%", opacity: 0 }}
                        animate={{ y: 0, x: "-50%", opacity: 1 }}
                        exit={{ y: 100, x: "-50%", opacity: 0 }}
                    >
                        <div className={styles.selectionCount}>
                            선택됨: <span className="text-blue-400">{selectedIds.length}</span> / {results.length}
                        </div>
                        <div className={styles.actionButtons}>
                            <Button variant="ghost" size="sm" onClick={handleCopyToClipboard}>
                                <Copy size={16} className="mr-2" /> HWP용 복사
                            </Button>
                            <Button size="sm" onClick={() => setIsPdfModalOpen(true)}>
                                <Download size={16} className="mr-2" /> 정품 시험지 출력
                            </Button>
                            <button
                                className="ml-4 text-white/50 hover:text-white"
                                onClick={() => setSelectedIds([])}
                            >
                                취소
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* PDF Preview Modal */}
            <AnimatePresence>
                {isPdfModalOpen && (
                    <div className={styles.modalOverlay} onClick={() => setIsPdfModalOpen(false)}>
                        <motion.div
                            className={styles.modalContent}
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                        >
                            <div className={styles.modalHeader}>
                                <div className="flex items-center gap-4">
                                    <h3 className="font-bold flex items-center gap-2">
                                        <Layout size={20} className="text-primary" /> 출력 템플릿 설정
                                    </h3>
                                    <div className={styles.templateSwitcher}>
                                        <button
                                            className={`${styles.templateBtn} ${pdfTemplate === 'standard' ? styles.templateBtnActive : ""}`}
                                            onClick={() => setPdfTemplate('standard')}
                                        >
                                            <FileText size={14} className="inline mr-1" /> 1단 기본
                                        </button>
                                        <button
                                            className={`${styles.templateBtn} ${pdfTemplate === 'exam' ? styles.templateBtnActive : ""}`}
                                            onClick={() => setPdfTemplate('exam')}
                                        >
                                            <BookOpen size={14} className="inline mr-1" /> 2단 모의고사형
                                        </button>
                                    </div>
                                </div>
                                <button onClick={() => setIsPdfModalOpen(false)}>
                                    <X size={24} />
                                </button>
                            </div>

                            <div className={styles.pdfPreview}>
                                <div className={styles.pdfPage} ref={pdfRef}>
                                    <div className={styles.pdfAcademy}>
                                        <div className={styles.pdfLogo}>🏛️ SMART ACADEMY</div>
                                        <div className="text-right text-sm">
                                            <div>2025학년도 1학기 중간고사 대비</div>
                                            <div className="font-bold">심화 영어 변형 문제지</div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between border-b-2 border-black pb-2 mb-4 text-sm font-bold">
                                        <div>과목: 고등 영어 (변형)</div>
                                        <div>CLASS: __________</div>
                                        <div>이름: __________</div>
                                        <div>확인: (인)</div>
                                    </div>

                                    <div className={pdfTemplate === 'exam' ? styles.pdfPageCols : styles.pdfQuestionGrid}>
                                        {selectedQuestions.map((q, i) => (
                                            <div key={q.id} className={styles.pdfQuestionItem}>
                                                <div className={styles.pdfQuestionText}>
                                                    {i + 1}. [유형: {q.type.split(' ')[0]}] 다음 글의 흐름으로 보아 알맞은 것은?
                                                </div>
                                                <div className="text-[0.7rem] bg-gray-50 p-3 mb-3 leading-relaxed border border-gray-100 italic">
                                                    {q.question.length > 300 ? q.question.substring(0, 300) + "..." : q.question}
                                                </div>
                                                {q.options && (
                                                    <div className={styles.pdfOptionGrid}>
                                                        {q.options.map((opt, oi) => (
                                                            <div key={oi} className="mb-1">({oi + 1}) {opt}</div>
                                                        ))}
                                                    </div>
                                                )}
                                                <div className="mt-4 border-t border-gray-100 pt-1 text-[0.6rem] text-gray-400">
                                                    * 정답 및 해설은 별지를 참고하세요.
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-auto pt-8 border-t text-[0.6rem] text-center text-gray-400">
                                        본 자료의 저작권은 SmartShift English 서비스를 이용하는 해당 학원에 있으며 무단 배포 및 상업적 목적의 사용을 엄격히 금합니다.
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 bg-gray-50 border-t flex justify-end gap-3">
                                <Button variant="ghost" onClick={() => setIsPdfModalOpen(false)}>취소</Button>
                                <Button
                                    onClick={handleDownloadPdf}
                                    isLoading={isDownloading}
                                >
                                    고품질 PDF 다운로드
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
