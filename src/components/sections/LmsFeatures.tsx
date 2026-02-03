"use client";

import styles from "./LmsFeatures.module.css";
import { Building2, Check } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export function LmsFeatures() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <section id="lms" className={styles.section}>
            <div className={`container ${styles.grid}`}>
                <motion.div
                    className={styles.imageWrapper}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className={styles.demoContainer}>
                        {/* Student Performance Chart */}
                        <motion.div
                            className={styles.demoCard}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className={styles.cardTitle}>실시간 학습 성취도</div>
                            <div className={styles.studentChart}>
                                {[
                                    { label: "Grammar", val: 85 },
                                    { label: "Vocabulary", val: 92 },
                                    { label: "Comprehension", val: 78 }
                                ].map((item, i) => (
                                    <div key={i} className={styles.chartRow}>
                                        <div className={styles.chartLabel}>
                                            <span>{item.label}</span>
                                            <span>{item.val}%</span>
                                        </div>
                                        <div className={styles.chartBarBg}>
                                            <motion.div
                                                className={styles.chartBarFill}
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${item.val}%` }}
                                                transition={{ duration: 1, delay: 0.7 + (i * 0.1) }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Mindmap Visualization */}
                        <motion.div
                            className={`${styles.demoCard} ${styles.mindmapCard}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                        >
                            <div className={styles.cardTitle}>지문 논리 구조도 (AI)</div>
                            <div className={styles.mindmapCanvas}>
                                <motion.div
                                    className={styles.mindNode}
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 3 }}
                                >
                                    Introduction
                                </motion.div>
                                <div style={{ height: '20px', width: '2px', background: 'var(--primary)', opacity: 0.2 }}></div>
                                <motion.div
                                    className={styles.mindNode}
                                    style={{ background: 'var(--primary)', color: 'white' }}
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ repeat: Infinity, duration: 4 }}
                                >
                                    Main Body
                                </motion.div>
                                <div style={{ height: '20px', width: '2px', background: 'var(--primary)', opacity: 0.2 }}></div>
                                <motion.div
                                    className={styles.mindNode}
                                    animate={{ y: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 3.5 }}
                                >
                                    Conclusion
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* PDF Branding Preview */}
                        <motion.div
                            className={styles.demoCard}
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 }}
                        >
                            <div className={styles.cardTitle}>교재 브랜딩 프리뷰</div>
                            <div className={styles.miniPdf}>
                                <div className={styles.miniPdfHeader}>SMART ACADEMY</div>
                                <div className={styles.miniPdfCols}>
                                    <div className={styles.miniPdfQuestion}></div>
                                    <div className={styles.miniPdfQuestion}></div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    className={styles.content}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div className={styles.badge} variants={itemVariants}>
                        <Building2 size={24} />
                    </motion.div>

                    <motion.h2 className={styles.headline} variants={itemVariants}>
                        데이터가 <br /><span className="text-primary">학부모를 설득합니다.</span>
                    </motion.h2>
                    <p className="text-muted-foreground mb-8 text-lg" style={{ wordBreak: 'keep-all', lineHeight: '1.6' }}>
                        막연한 칭찬보다 명확한 데이터 리포트가 원장님의 전문성을 증명합니다.<br />
                        학부모의 두터운 신뢰와 압도적인 관리 효율, 지금 바로 시작하세요.
                    </p>

                    <div className={styles.featureList}>
                        {[
                            { title: "시그니처 교재 브랜딩", desc: "학원 로고와 이름이 박힌 자체 교재를 생성해 브랜드 가치를 지키세요." },
                            { title: "약점 데이터 정밀 분석", desc: "단순 오답 확인을 넘어 학생별 취약 유형을 실시간 데이터로 진단합니다." },
                            { title: "지문 논리 구조의 시각화", desc: "복잡한 지문 흐름을 마인드맵으로 시각화하여 강의의 전문성을 높입니다." }
                        ].map((item, i) => (
                            <motion.div key={i} className={styles.featureItem} variants={itemVariants}>
                                <Check className={styles.checkIcon} />
                                <div className={styles.featureText}>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
