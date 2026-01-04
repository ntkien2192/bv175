import React from 'react'
import NextImg from '../../common/next-img'

export default function LoadingComp() {
    return (
        <div className="h-[30vh] w-full flex justify-center items-center">
            <div className="relative size-6 md:size-7 xl:size-9 3xl:size-10 animate-spin">
                <NextImg
                    src="/assets/icons/loading_spin.svg"
                    alt="loading spin"
                />
            </div>
        </div>
    )
}
