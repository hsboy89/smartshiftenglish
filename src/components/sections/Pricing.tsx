"use client";

import styles from "./Pricing.module.css";
import { Button } from "../ui/Button";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

export function Pricing() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section id="pricing" className={styles.section}>
            <div className="container">
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className={styles.headline}>합리적인 플랜으로 업무의 질을 바꾸세요</h2>
                    <p className={styles.subheadline}>강사님께 꼭 필요한 기능들만 모았습니다.</p>
                </motion.div>

                <motion.div
                    className={styles.grid}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* Studio Plan */}
                    <motion.div className={styles.card} variants={cardVariants} whileHover={{ y: -10 }}>
                        <div className={styles.planName}>Essential (교습소)</div>
                        <div className={styles.price}>
                            무료 <span className={styles.priceUnit}>/ 체험판</span>
                        </div>

                        <ul className={styles.featureList}>
                            <li className={styles.featureItem}><Check className={styles.check} /> AI 지문 변형 월 10회</li>
                            <li className={styles.featureItem}><Check className={styles.check} /> 학생 관리 최대 5명</li>
                            <li className={`${styles.featureItem} ${styles.disabled}`}><X className={styles.xMark} /> 프리미엄 브랜딩</li>
                            <li className={`${styles.featureItem} ${styles.disabled}`}><X className={styles.xMark} /> 전용 대시보드</li>
                        </ul>

                        <Button variant="ghost" style={{ border: '1px solid var(--border)' }}>체험 시작하기</Button>
                    </motion.div>

                    {/* Growth Plan */}
                    <motion.div
                        className={`${styles.card} ${styles.popular}`}
                        variants={cardVariants}
                        whileHover={{ y: -10 }}
                    >
                        <div className={styles.popularBadge}>가장 추천</div>
                        <div className={`${styles.planName} text-primary`}>Professional (학원)</div>
                        <div className={styles.price}>
                            49,000원 <span className={styles.priceUnit}>/ 월</span>
                        </div>

                        <ul className={styles.featureList}>
                            <li className={styles.featureItem}><Check className={styles.check} /> 지문 변형 무제한</li>
                            <li className={styles.featureItem}><Check className={styles.check} /> 학생 관리 최대 100명</li>
                            <li className={styles.featureItem}><Check className={styles.check} /> 시그니처 PDF 브랜딩</li>
                            <li className={styles.featureItem}><Check className={styles.check} /> 관리용 모바일 대시보드</li>
                        </ul>

                        <Button>무료 상담 신청</Button>
                    </motion.div>

                    {/* Enterprise Plan */}
                    <motion.div
                        className={`${styles.card} ${styles.businessCard}`}
                        variants={cardVariants}
                        whileHover={{ y: -10, filter: "brightness(1.2)" }}
                    >
                        <div className={styles.planName}>Custom Enterprise</div>
                        <div className={styles.price}>
                            별도 협의
                        </div>

                        <ul className={styles.featureList}>
                            <li className={styles.featureItem}><Check className={styles.check} /> 프랜차이즈 통합 관리</li>
                            <li className={styles.featureItem}><Check className={styles.check} /> 도메인 & UI 커스터마이징</li>
                            <li className={styles.featureItem}><Check className={styles.check} /> 전용 고객 성공 매니저</li>
                            <li className={styles.featureItem}><Check className={styles.check} /> 서버 무제한 스토리지</li>
                        </ul>

                        <Button variant="secondary" style={{ background: '#1e293b', color: 'white', border: '1px solid #334155' }}>
                            맞춤 컨설팅 신청
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
