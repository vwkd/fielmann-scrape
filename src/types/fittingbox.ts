/**
 * Generated with https://app2.quicktype.io/
 *
 * for response from `https://renderservice-v5.fittingbox.com/photorender/310/fitmix_'${apiKey}_${currentTime}?productName=Fitmix`
 *
 * - might be incomplete
 */

export interface PhotoRender {
  frames: Frame[];
  id: string;
  detectionResult: DetectionResult;
}

export interface DetectionResult {
  recognitionState: number;
  views: View[];
  avatarParams: number[];
  avatarScale: number[];
  avatarModelType: string;
  avatarMesh: string;
  avatarMeshOccultation: string;
  faceReconstructionConfidence: number;
  computedPD: number;
  isGlassesDetected: number;
  version: string;
  id: string;
  errorCode: number;
  errorDescription: string;
}

export interface View {
  referenceCameraIndex: number;
  avatarPose: AvatarPose;
  recognitionSceneDatas: RecognitionSceneData[];
}

export interface AvatarPose {
  translation: number[];
  rotation: number[];
  scale: number[];
}

export interface RecognitionSceneData {
  cameraFocal: CameraCenterPoint;
  cameraCenterPoint: CameraCenterPoint;
  eyesPoints: CameraCenterPoint[];
  detectedPoints: CameraCenterPoint[];
  earsDetectedPoints: EarsDetectedPoints;
  detectedFaceRegion: DetectedFaceRegion;
  projectedPoints: CameraCenterPoint[];
}

export interface CameraCenterPoint {
  x: number;
  y: number;
}

export interface DetectedFaceRegion {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface EarsDetectedPoints {
  rightEars: [];
  leftEars: [];
}

export interface Frame {
  id: string;
  parsedRenderResult:
    | ParsedRenderResult
    | Record<string | number | symbol, never>;
  frameDataPath: string;
  frameDataKey: string;
  requestedId: number;
  binName: string;
  outputImageB64?: string;
}

export interface ParsedRenderResult {
  id: string;
  errorCode: number;
  errorDescription: string;
}
