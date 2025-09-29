"use client"
import Image from "next/image";
import { motion } from "framer-motion";
import Me1 from "@/public/me3.jpg";
import Me2 from "@/public/me2.jpg";
import Me3 from "@/public/me1.jpg";
import Hr from "@/components/layout/Hr";

function Title() {
    return (
        <div className="mt-10 flex flex-col justify-start items-center w-full px-4 md:px-8 max-w-7xl mx-auto">
            <div className="flex justify-center items-center flex-col my-5">
                <Hr title="About Me" />
            </div>
        </div>
    );
}

export default function Intro() {
    return (
        <div className="w-full overflow-x-hidden mt-15">
            <Title />
            <div className="relative mx-auto max-w-7xl gap-4 px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 mb-10">
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
                    <p className="text-gray-600 text-justify text-lg">
                        <span className="text-orange-600 font-medium">
                            Nothing about me is self-made. I owe God everything!
                        </span>{" "}
                        I feel like people are a little too serious, and hey, that is cool and I love it, but that is not me. Not to say I am not serious. Allow me to introduce myself: I am a{" "}
                        <span className="text-orange-600 font-medium">
                            Doctor of Philosophy in Statistics
                        </span>{" "}
                        with a Postgraduate Certificate in Learning and Education, Master of Research in Mathematical Modelling, Master of Science in Mathematical Science, and Bachelor of Science in Actuarial Science.{" "}
                        I get the work done with no excuses. I am an expert in{" "}
                        <span className="text-orange-600 font-medium">
                            statistics, data science, research, education, programming, machine learning, and artificial intelligence
                        </span>, just to name a few. But I bring something extra to the table: a unique blend of technical expertise and creative energy that makes complex problems feel approachable and exciting.
                    </p>
                </motion.div>
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
                                className="w-full h-full">
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
                                className="w-full h-full">
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
                                className="w-full h-full">
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
            </div>
        </div>
    );
}
