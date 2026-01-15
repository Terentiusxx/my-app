"use client"
import Image from "next/image";
import { motion } from "framer-motion";
import Me1 from "@/public/me3.jpg";
import Me2 from "@/public/me2.jpg";
import Me3 from "@/public/me1.jpg";
import SectionTitle from "@/components/layout/SectionTitle";
import Copy from "@/components/Home/Copy";
import { Button } from "@/components/ui/button";

export default function Intro() {
    return ( 
        <section className="w-full overflow-x-hidden">
            <div className="relative mx-auto max-w-7xl gap-4 px-4 md:px-8 mb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-center items-start flex-col mb-5">
                    <div className="images relative w-full aspect-square overflow-hidden">
                        <div className="absolute top-28 left-4 w-[50%] aspect-square hover:scale-105 transition-all ease duration-300">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, x: 100 }}
                                whileInView={{
                                    opacity: 1,
                                    scale: 1,
                                    x: 0,
                                }}
                                className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-500">
                                <Image
                                    src={Me1}
                                    alt="Anquandah"
                                    fill
                                    style={{ objectFit: "cover" }}
                                    placeholder="blur"
                                />
                            </motion.div>
                        </div>
                        <div className="absolute top-16 right-16 w-[30%] aspect-square hover:scale-105 transition-all ease duration-300">
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.5,
                                    x: -100,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    scale: 1,
                                    x: 0,
                                }}
                                transition={{ delay: 0.3 }}
                                className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-500">
                                <Image
                                    src={Me2}
                                    alt="Anquandah"
                                    fill
                                    style={{ objectFit: "cover" }}
                                    placeholder="blur"
                                />
                            </motion.div>
                        </div>
                        <div className="absolute bottom-16 right-8 w-[40%] aspect-square hover:scale-105 transition-all ease duration-300">
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.5,
                                    x: -100,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    scale: 1,
                                    x: 0,
                                }}
                                transition={{
                                    delay: 0.5,
                                }}
                                className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-500">
                                <Image
                                    src={Me3}
                                    alt="Anquandah"
                                    fill
                                    style={{ objectFit: "cover" }}
                                    placeholder="blur"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
                <motion.div
                    className="flex justify-center items-start flex-col mb-5 md:px-10"
                    initial={{
                        opacity: 0,
                        x: 200,
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                    }}
                    transition={{
                        delay: 0.5,
                        type: "spring",
                    }}>
                    <SectionTitle text="MY PHILOSOPHY" />
                    <Copy>
                        <p className="text-white text-justify text-lg">
                            Professional doesn't mean stiff. I believe real impact happens when expertise meets authentic enthusiasm. Let's shatter the boring blueprint.
                        </p>
                    </Copy>
                    <Copy delay={0.3}>
                        <p className="text-white/80 text-justify text-base mt-4">
                            Nothing about me is self-made. I owe God everything!
                        </p>
                    </Copy>
                    <Copy delay={0.5}>
                        <div className="mt-6">
                            <Button 
                                variant="outline" 
                                className="rounded-full border-2 border-white text-white bg-transparent hover:bg-transparent hover:border-red-600 hover:text-red-600"
                                onClick={() => window.location.href = '/about'}
                            >
                                Read More About Me
                            </Button>
                        </div>
                    </Copy>
                </motion.div>
                </div>
            </div>
        </section>
    );
}
