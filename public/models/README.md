# 3D-Modelle

Lege hier die 3D-Dateien deiner cameras ab. Unterstützt werden **OBJ** und **GLB** Formate.

## Dateien

| camera     | OBJ-Dateien                                              | GLB-Datei (Scan)          |
|------------|----------------------------------------------------------|---------------------------|
| Kaderblick | `kaderblick-camera.obj` + `kaderblick-camera.mtl` (opt.) | `kaderblick-camera.glb`   |
| PTZ        | `ptz-camera.obj` + `ptz-camera.mtl` (optional)           | `ptz-camera.glb`          |

## Formate

### OBJ (Wavefront)

- Standard-3D-Format, wird von fast jeder 3D-Software exportiert (Blender, FreeCAD, Fusion 360, …)
- Optional mit `.mtl`-Datei für Materialien/Farben
- Wird im Viewer über **Three.js** gerendert
- Falls keine MTL vorhanden: graues Standard-Material

### GLB (glTF Binary)

- Kompaktes Format ideal für Photogrammetrie-Scans (Smartphone-Apps)
- Enthält Geometrie, Materialien und Texturen in einer Datei
- Wird im Viewer über **model-viewer** Web Component gerendert

## Wenn beide Formate vorhanden sind

Sind für eine camera sowohl OBJ als auch GLB vorhanden, zeigt die 3D-Ansicht einen **Umschalter**:

- **📐 OBJ-Modell** – z.B. CAD-Export mit sauberer Geometrie
- **🧊 GLB-Scan** – z.B. Photogrammetrie-Scan mit Texturen

## Workflow

### OBJ aus CAD-Software

1. Modell in Blender / FreeCAD / Fusion 360 erstellen oder importieren
2. Als `.obj` exportieren (mit `.mtl` wenn Materialien gewünscht)
3. Dateien in diesen Ordner kopieren

### GLB aus Smartphone-Scan

1. Mit Polycam, Luma AI oder RealityScan die camera rundherum fotografieren
2. Als `.glb` exportieren (Draco-Komprimierung empfohlen)
3. Die `.glb`-Datei in diesen Ordner kopieren
