"use client";

import Link from "next/link";
import styles from "./Hero.module.css";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className={styles.section}>
            <div className={`container ${styles.grid}`}>
                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className={styles.badge}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                    >
                        <span className={styles.badgeDot}></span>
                        2025 NEW AI ENGINE UPDATE
                    </motion.div>

                    <motion.h1
                        className={styles.headline}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        고급 AI 모델을 활용한 <br />문제 변형,
                        원장님은  <br /><span className={styles.highlight}>성과</span>에만 집중하세요.
                    </motion.h1>

                    <motion.p
                        className={styles.description}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        단 한 장의 사진으로 구현되는 시그니처 시험지와 정밀한 학습 데이터.<br />
                        스마트시프트가 당신의 학원을 프리미엄 교육 브랜드로 혁신합니다.
                    </motion.p>

                    <motion.div
                        className={styles.actions}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                    >
                        <Button size="lg">
                            도입 상담 신청하기 <ArrowRight size={18} style={{ marginLeft: "0.5rem" }} />
                        </Button>
                        <Button variant="outline" size="lg">학원 전용 요금제</Button>
                    </motion.div>
                </motion.div>

                <motion.div
                    className={styles.imageWrapper}
                    initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    <Image
                        src="/hero-dashboard.png"
                        alt="SmartShift Dashboard"
                        width={800}
                        height={450}
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        priority
                        onError={(e) => {
                            e.currentTarget.style.display = "none";
                        }}
                    />
                    <div className={styles.imagePlaceholder} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
                        Dashboard Preview
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
