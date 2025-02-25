import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import {
    Video,
    Download,
    Fullscreen,
    Zoom,
    Thumbnails,
    Counter,
} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function MediaMsgGrid({ media, incoming }) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    };
    const renderMedia = () => {
        if (media?.length === 1) {
            return (
                <div className="col-span-2 row-span-2 relative rounded-2xl">
                    <MediaItem
                        media={media[0]}
                        index={0}
                        openLightbox={openLightbox}
                        lightboxOpen={lightboxOpen}
                    />
                </div>
            );
        } else if (media?.length === 2) {
            return media.map((item, index) => (
                <div
                    key={item._id}
                    className="col-span-1 row-span-2 relative rounded-2xl"
                >
                    <MediaItem
                        media={item}
                        index={index}
                        openLightbox={openLightbox}
                        lightboxOpen={lightboxOpen}
                    />
                </div>
            ));
        } else if (media?.length === 3) {
            return media.slice(0, 3).map((item, index) => (
                <div
                    key={item._id}
                    className="col-span-1 row-span-1 relative rounded-2xl"
                >
                    <MediaItem
                        media={item}
                        index={index}
                        openLightbox={openLightbox}
                        lightboxOpen={lightboxOpen}
                    />
                </div>
            ));
        } else {
            return (
                <>
                    {media?.slice(0, 3).map((item, index) => (
                        <div
                            key={item._id}
                            className="col-span-1 row-span-1 relative rounded-2xl "
                        >
                            <MediaItem
                                media={item}
                                index={index}
                                openLightbox={openLightbox}
                                lightboxOpen={lightboxOpen}
                            />
                        </div>
                    ))}
                    <div
                        onClick={() => openLightbox(3)}
                        className="relative rounded-2xl bg-gray-400 bg-body/50 flex flex-row items-center justify-center text-xl text-white font-semibold cursor-pointer"
                    >
                        <div>+{media?.length - 3}</div>
                    </div>
                </>
            );
        }
    };
    return (
        <div
            className={`grid grid-cols-2 grid-rows-2 pt-4 pb-2 gap-3 rounded-2xl rounded-tl-none ${
                incoming ? "bg-gray dark:bg-boxdark-2" : "bg-transparent"
            }`}
        >
            {renderMedia()}
            {lightboxOpen &&
                (media.every((item) => item.type === "video") ? (
                    <Lightbox
                        plugins={[Video, Fullscreen, Counter, Thumbnails]}
                        open={() => setLightboxOpen(true)}
                        close={() => setLightboxOpen(false)}
                        slides={media.map((item) => ({
                            type: "video",
                            width: 1280,
                            height: 520,
                            src: item.url,
                            sources: [
                                {
                                    src: item.url,
                                    type: "video/mp4",
                                    video: {
                                        controls: false,
                                        autoPlay: true,
                                    },
                                },
                            ],
                        }))}
                    />
                ) : (
                    <Lightbox
                        plugins={[
                            Download,
                            Fullscreen,
                            Zoom,
                            Counter,
                            Thumbnails,
                        ]}
                        open={() => setLightboxOpen(true)}
                        close={() => setLightboxOpen(false)}
                        index={currentIndex}
                        slides={media.map((item) => ({
                            src: item.url,
                            type: item.type === "video" ? "video" : "image",
                            video:
                                item.type === "video"
                                    ? { controls: false, autoPlay: false }
                                    : null,
                        }))}
                    />
                ))}
        </div>
    );
}

function MediaItem({ media, index, openLightbox, lightboxOpen }) {
    console.log("light box open", media);
    return (
        <>
            {media.type === "video" ? (
                <video
                    src={media.url}
                    className="h-full w-full max-h-36 rounded-lg object-cover"
                    controls={false}
                    autoPlay={false}
                    onClick={() => openLightbox(index)}
                />
            ) : (
                <img
                    src={media.url}
                    className="h-full w-full max-h-36 rounded-lg object-cover"
                    onClick={() => openLightbox(index)}
                />
            )}
            <button className="absolute top-3 right-4 bg-gray/80 dark:bg-boxdark px-2 rounded-md hover:bg-opacity-80 hover:cursor-pointer hover:text-black dark:hover:text-white  bg-gray-300">
                <i className="pi pi-download text-gray-500"></i>
            </button>
        </>
    );
}
