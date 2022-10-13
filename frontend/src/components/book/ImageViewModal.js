import {useEffect, useRef} from "react";

function ImageViewModal() {
    const imageViewModal = useRef();
    const imageViewImg = useRef();
    const imageViewWidth = useRef();

    useEffect(() => {
        imageViewModal.current.addEventListener("show.bs.modal", (e) => {
            const t = e.relatedTarget;
            imageViewImg.current.style.width = "100%";
            imageViewWidth.current.value = 100;
            imageViewImg.current.alt = t.alt;
            imageViewImg.current.src = t.src;
        });
    }, []);

    function widthChange(e) {
        imageViewImg.current.style.width = e.target.value + "%";
    }

    function wheelChange(e) {
        if (e.deltaY < 0) {
            e.target.stepUp();
        }
        if (e.deltaY > 0) {
            e.target.stepDown();
        }
        imageViewImg.current.style.width = e.target.value + "%";
    }

    return (
        <div className={"modal fade"} id={"image-view-modal"} tabIndex={-1} aria-labelledby={"image-view-modal-label"}
             aria-hidden={true} ref={imageViewModal}>
            <div className={"modal-dialog modal-fullscreen"}>
                <div className={"modal-content"}>
                    <div className={"modal-header"}>
                        <h5 className={"modal-title"} id={"image-view-modal-label"}>Image from book</h5>
                        <button type={"button"} className={"btn-close"} data-bs-dismiss={"modal"} aria-label={"Close"}/>
                    </div>
                    <div className={"modal-body p-0"}>
                        <img ref={imageViewImg}/>
                    </div>
                    <div className={"modal-footer justify-content-center"}>
                        <input ref={imageViewWidth} type={"range"} className={"form-range w-auto"} min={10} max={300}
                               step={10} defaultValue={100} onChange={widthChange} onWheel={wheelChange}/>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ImageViewModal;
