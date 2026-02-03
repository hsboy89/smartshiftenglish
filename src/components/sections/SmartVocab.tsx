"use client";

import styles from "./SmartVocab.module.css";
import { Activity, Bell, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";

export function SmartVocab() {
    return (
        <section id="voca" className={styles.section}>
            <div className={`container ${styles.grid}`}>
                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className={styles.headline}>
                        망각을 이기는 <br /><span style={{ color: "var(--primary)" }}>데이터의 힘</span>
                    </h2>
                    <p className={styles.subheadline}>
                        단어 암기, 더 이상 학생의 의지에만 맡기지 마세요.<br />
                        반복 주기와 취약점을 완벽히 계산해내는 과학적 학습 시스템입니다.
                    </p>

                    <div className={styles.featureList}>
                        <motion.div
                            className={styles.featureCard}
                            whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                        >
                            <div className={styles.iconBox}>
                                <BarChart2 size={24} />
                            </div>
                            <div>
                                <span className={styles.featureTitle}>SM-2 맞춤 알고리즘</span>
                                <span className={styles.featureDesc}>
                                    Interval(n) = Interval(n-1) × EF (Easiness Factor)
                                </span>
                            </div>
                        </motion.div>

                        <motion.div
                            className={styles.featureCard}
                            whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                        >
                            <div className={styles.iconBox}>
                                <Bell size={24} />
                            </div>
                            <div>
                                <span className={styles.featureTitle}>자동 푸시 알림</span>
                                <span className={styles.featureDesc}>
                                    복습이 필요한 순간 카카오톡/앱 알림 발송
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    className={styles.graphCard}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className={styles.graphHeader}>
                        <Activity size={20} className="text-green-400" />
                        지능형 학습 곡선 (Memory Retention)
                    </div>

                    <div className={styles.chartArea}>
                        <svg viewBox="0 0 400 200" className={styles.curve} preserveAspectRatio="none">
                            {/* Forgetting Curve (Red, dashed) */}
                            <motion.path
                                d="M0,20 Q50,150 400,180"
                                fill="none"
                                stroke="#ef4444"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />

                            {/* Retention Curve (Green) */}
                            <motion.path
                                d="M0,20 Q100,25 100,20 Q200,25 200,20 Q400,25 400,20"
                                fill="none"
                                stroke="#10b981"
                                strokeWidth="3"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                            />

                            {/* Spaced Repetition Dots */}
                            {[
                                { x: 0, y: 20 },
                                { x: 100, y: 20 },
                                { x: 200, y: 20 },
                                { x: 400, y: 20 }
                            ].map((dot, i) => (
                                <motion.circle
                                    key={i}
                                    cx={dot.x}
                                    cy={dot.y}
                                    r="4"
                                    fill="#10b981"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 1 + (i * 0.3) }}
                                />
                            ))}
                        </svg>

                        <div style={{ position: 'absolute', bottom: '10px', left: '25%', fontSize: '0.75rem', color: '#64748b' }}>1주일</div>
                        <div style={{ position: 'absolute', bottom: '10px', left: '50%', fontSize: '0.75rem', color: '#64748b' }}>1개월</div>
                        <div style={{ position: 'absolute', bottom: '10px', right: '0', fontSize: '0.75rem', color: '#64748b' }}>3개월</div>
                    </div>

                    <motion.div
                        className={styles.infoBox}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 2.5 }}
                    >
                        SmartShift는 적기 복습을 통해 장기 기억(Long-term Memory) 상태를 유지합니다.
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
