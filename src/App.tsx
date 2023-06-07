import { useEffect, useState } from "react";

export default function App() {
  const [mediaDevices, setMediaDevices] = useState<MediaDeviceInfo[]>();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: {}
      })
      .then((device) => {
        navigator.mediaDevices.enumerateDevices().then((devices) => {
          setMediaDevices(devices);
        });
      });
  }, []);

  return (
    <div className="App">
      {mediaDevices === undefined ? (
        "Getting media devices (allow permission)"
      ) : (
        <ul>
          {mediaDevices.map((device) => (
            <li>
              Name: <code>{device.label}</code>
              <br />
              {device.kind === "videoinput" && (
                <>
                  Max FPS: <code>{device.getCapabilities().frameRate.max}</code>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
