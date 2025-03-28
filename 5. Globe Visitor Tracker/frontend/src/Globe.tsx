import { useEffect, useRef, useState } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import * as THREE from 'three';

type Marker = {
    lat: number;
    lng: number;
    name?: string;
};

const EarthGlobe = () => {
    const globeEl = useRef<GlobeMethods | undefined>(undefined);
    const [markers, setMarkers] = useState<Marker[]>([]);

    useEffect(() => {
      fetch('/api/visits')
          .then(response => response.json())
          .then((data: Marker[]) => {
              setMarkers(data);
          })
          .catch((err) => {
              console.error("Failed to fetch visits, using dummy data", err);
              setMarkers([
                  { lat: 51.5074, lng: -0.1278, name: "London" },
              ]);
          });
  }, []);

    useEffect(() => {
        if (!globeEl.current) return;
        const globe = globeEl.current;

        if (globe.controls && typeof globe.controls === 'function') {
            const controls = globe.controls();
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.35;
        }

        const CLOUDS_IMG_URL = '/clouds.png';
        const CLOUDS_ALT = 0.004;
        const CLOUDS_ROTATION_SPEED = -0.006;

        new THREE.TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture) => {
            const globeRadius = globe.getGlobeRadius();
            const clouds = new THREE.Mesh(
                new THREE.SphereGeometry(globeRadius * (1 + CLOUDS_ALT), 75, 75),
                new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true, opacity: 0.0 })
            );
            globe.scene().add(clouds);

            (function rotateClouds() {
                clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
                requestAnimationFrame(rotateClouds);
            })();
        });
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Globe
                ref={globeEl}
                animateIn={true}
                globeImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
                backgroundImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png"
                pointsData={markers}
                pointLat="lat"
                pointLng="lng"
                pointColor={() => "blue"}
                pointAltitude={0.01}
                pointRadius={0.5}
            />
        </div>
    );
};

export default EarthGlobe;