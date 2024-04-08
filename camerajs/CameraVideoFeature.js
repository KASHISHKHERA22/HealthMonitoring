import React, { useState, useCallback, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ClearIcon from '@mui/icons-material/Clear';
import Videocam from '@mui/icons-material/Videocam';
import SwitchIcon from '@mui/icons-material/Cameraswitch';
import videoImg from '../assets/videoImg.jpg';
import Button from '@mui/material/Button';
import CameraOutlinedIcon from '@mui/icons-material/CameraOutlined';
import Tooltip from '@mui/material/Tooltip';

export default function CameraVideoFeature({ chatController, actionRequest }) {
    const chatCtl = chatController;
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [isVideoRecording, setIsVideoRecording] = useState(false);
    const [isCameraStart, setIsCameraStart] = useState(false);
    const [videoStream, setVideoStream] = useState(null);
    const [mediaValue, setMediaValue] = useState(null);
    const [selectedCamera, setSelectedCamera] = useState('user');
    const [showCapturedImage, setShowCapturedImage] = useState(false);

    useEffect(() => {
        startCamera('user');
        return () => {
            stopCamera();
        };
    }, []);

    const startCamera = async (cameraType) => {
        try {
            const constraints = {
                video: { facingMode: cameraType === 'user' ? 'user' : 'environment' },
            };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setVideoStream(stream);
            setIsCameraStart(true);
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const switchCamera = async () => {
        if (videoStream) {
            stopCamera();
            const newCamera = selectedCamera === 'user' ? 'environment' : 'user';
            setSelectedCamera(newCamera);
            startCamera(newCamera);
        }
    };

    const stopCamera = () => {
        if (videoStream) {
            videoStream.getTracks().forEach((track) => track.stop());
            setVideoStream(null);
            setIsVideoRecording(false);
        }
    };

    const captureImage = () => {
        if (videoStream) {
            const videoElement = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            const videoWidth = videoElement.videoWidth;
            const videoHeight = videoElement.videoHeight;
            canvas.width = videoWidth;
            canvas.height = videoHeight;
            context.drawImage(videoElement, 0, 0, videoWidth, videoHeight);

            canvas.toBlob((blob) => {
                if (blob) {
                    const imageFile = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
                    setMediaValue(imageFile);
                    setShowCapturedImage(true);
                }
            }, 'image/jpeg');
        }
        setIsCameraStart(false);
        setTimeout(() => {
            stopCamera();
        }, 500);
    };

    const keepImage = () => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Data = btoa(String.fromCharCode.apply(null, new Uint8Array(reader.result)));
            const res = {
                type: 'text',
                value: 'Image captured successfully!' + base64Data,
                data: mediaValue,
            };
            chatCtl.setActionResponse(actionRequest, res);
            setMediaValue(null);
            setShowCapturedImage(false);
        };
        reader.readAsArrayBuffer(mediaValue);
        // const res = {
        //     type: 'text',
        //     value: 'Image captured successfully!' + mediaValue,
        //     data: mediaValue,
        // };
        // chatCtl.setActionResponse(actionRequest, res);
        // setMediaValue(null);
        // setShowCapturedImage(false);
    };

    const captureVideo = (file) => {
        const res = {
            type: 'text',
            value: 'Video captured successfully!' + videoImg,
            data: file,
        };
        chatCtl.setActionResponse(actionRequest, res);
        setMediaValue(null);
        setShowCapturedImage(false);
    };

    const retakeImage = () => {
        setShowCapturedImage(false);
        startCamera(selectedCamera);
    };

    const toggleVideoRecording = () => {
        if (videoStream) {
            if (!isVideoRecording) {
                const mediaRecorder = new MediaRecorder(videoStream);
                const chunks = [];
                mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        chunks.push(event.data);
                    }
                };

                mediaRecorder.onstop = () => {
                    const blob = new Blob(chunks, { type: 'video/webm' });
                    const videoFile = new File([blob], 'captured-video.webm', { type: 'video/webm' });
                    setMediaValue(videoFile);
                    setIsVideoRecording(false);
                    setIsCameraStart(false);
                    captureVideo(videoFile);
                };
                mediaRecorderRef.current = mediaRecorder;
                mediaRecorder.start();
                setIsVideoRecording(true);
            } else {
                stopCamera();
            }
        }
    };

    const setCancelVideo = () => {
        if (isCameraStart) {
            videoStream.getTracks().forEach((track) => track.stop());
            setVideoStream(null);
            setIsCameraStart(false);
        }
        if (isVideoRecording) {
            setIsVideoRecording(false);
            if (mediaRecorderRef.current) {
                mediaRecorderRef.current.onstop = null;
                mediaRecorderRef.current.stop();
                mediaRecorderRef.current = null;
            }
        }
        setCancelled();
    };

    const setCancelled = useCallback(() => {
        const res = {
            type: 'text',
            value: 'Cancelled',
        };
        chatCtl.setActionResponse(actionRequest, res);
    }, [actionRequest, chatCtl]);

    // useEffect(() => {
    //     let res = {};
    //     if (isVideoRecording && mediaValue !== null) {
    //         res = {
    //             type: 'text',
    //             value: 'Video captured successfully!',
    //             data: mediaValue,
    //         };
    //         chatCtl.setActionResponse(actionRequest, res);
    //         setMediaValue(null);
    //     }
    // }, [actionRequest, chatCtl, mediaValue]);

    return (
        <Box
            sx={{
                flex: '1 1 auto',
                display: 'flex',
                '& > :first-child': {
                    flex: '1 1 auto',
                    minWidth: 0,
                },
                '& > * + *': {
                    ml: 1,
                },
                '& :last-child': {
                    flex: '0 1 auto',
                },
                flexDirection: isCameraStart ? 'column' : 'row',
            }}
        >
            <video
                ref={videoRef}
                autoPlay
                muted
                style={
                    isCameraStart
                        ? { display: 'block', borderRadius: '3em', width: '90%', margin: '2vh 2vw' }
                        : { display: 'none' }
                }
            />
            {isCameraStart && <canvas ref={canvasRef} style={{ display: 'none' }} />}

            {showCapturedImage && (
                <div>
                    <img
                        src={URL.createObjectURL(mediaValue)}
                        alt="Captured"
                        style={{ width: '100%', borderRadius: '1em'}}
                    />
                    <div style={{ textAlignLast: 'center'}}>
                        <Button
                            style={{ padding: '0.6em 2em' }}
                            type="button"
                            onClick={keepImage}
                            variant="contained"
                        >Send Image
                        </Button>
                        <Button
                            style={{ marginLeft: '1vw', padding: '0.6em 2em' }}
                            type="button"
                            onClick={retakeImage}
                            variant="contained"
                        >Retake Image
                        </Button>
                    </div>
                </div>
            )}

            {!showCapturedImage && <div style={{ flexDirection: 'row', alignSelf: 'center' }}>
                {/* <TextField
                    placeholder="Add Text...."
                    style={{ width: '68%' }}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    autoFocus
                    multiline
                    variant="outlined"
                    maxRows={4}
                    InputProps={{
                        endAdornment: (
                            <div style={{ display: 'contents' }}>
                                {!isVideoRecording && (
                                    <Tooltip title="Switch Camera">
                                        <SwitchIcon
                                            style={{
                                                marginRight: '0.5vw',
                                                cursor: 'pointer',
                                                color: '#b22117',
                                            }}
                                            onClick={switchCamera}
                                        />
                                    </Tooltip>
                                )}
                                {!isVideoRecording && (
                                    <Tooltip title="Start Recording">
                                        <Videocam
                                            style={{
                                                marginRight: '0vw',
                                                cursor: 'pointer',
                                                color: '#b22117',
                                            }}
                                            onClick={toggleVideoRecording}
                                        />
                                    </Tooltip>
                                )}
                            </div>
                        ),
                    }}
                /> */}
                <Tooltip title="Switch Camera">{!isVideoRecording && <Button
                    style={{ margin: '0 0 1vh 0', padding: '1em'}}
                    type="button"
                    onClick={switchCamera}
                    variant="contained"
                    startIcon=<SwitchIcon />
                ></Button>}</Tooltip>
                <Tooltip title={!isVideoRecording ? 'Capture Image' : 'Stop Recording'}><Button
                    style={{ margin: '0 0 1vh 1vw', padding: '1em'}}
                    type="button"
                    onClick={!isVideoRecording ? captureImage : toggleVideoRecording}
                    variant="contained"
                    startIcon= {<CameraOutlinedIcon /> }
                >{isVideoRecording && "Stop"}</Button></Tooltip>
                <Tooltip title="Start Recording">{!isVideoRecording && <Button
                    style={{ margin: '0 0 1vh 1vw', padding: '1em'}}
                    type="button"
                    onClick={toggleVideoRecording}
                    variant="contained"
                    startIcon=<Videocam />
                ></Button>}</Tooltip>
                <Tooltip title="Cancel"><Button
                    style={{ margin: '0 0 1vh 1vw', padding: '1em'}}
                    type="button"
                    onClick={setCancelVideo}
                    variant="contained"
                    startIcon=<ClearIcon />
                ></Button></Tooltip>
            </div>}
        </Box>
    );
}
