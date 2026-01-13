"use client"
import React from "react"
import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function Hr({ title }: { title: string }) {
    return (
        <div>
            {/* Container for the text - this defines the width */}
            <div className="inline-block">
                {/* Hr lines centered within the text container */}
                <div className="flex flex-col items-center mb-6">
                    <motion.div
                        className="bg-red-600 w-28 h-1 rounded-full mb-3"
                        initial={{
                            opacity: 0,
                            x: -100,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            delay: 0.3,
                            type: "spring",
                        }}></motion.div>
                    <motion.div
                        className="bg-red-600 w-28 h-1 rounded-full"
                        initial={{
                            opacity: 0,
                            x: 200,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: -50,
                        }}
                        transition={{
                            delay: 0.4,
                            type: "spring",
                        }}></motion.div>
                </div>

                {/* Title text */}
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[0.77] tracking-tight text-white">
                    {title.split('\\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            {index < title.split('\\n').length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </h2>
            </div>
        </div>
    );
}

Hr.propTypes = {
    title: PropTypes.string.isRequired,
};
