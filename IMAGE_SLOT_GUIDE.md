# Image slot guide

This project now has placeholder image slots that show users exactly where images belong. Add images to `public/portfolio_images/...` using the filenames below, or edit the corresponding route file and change the `src` value.

## About page hobbies section
Route: `src/routes/about.tsx`

| Slot | Path | What to place there |
|---|---|---|
| H-01 | `/portfolio_images/hobbies/guitar-music.jpg` | Guitar, music, performance, or award photo |
| H-02 | `/portfolio_images/hobbies/astronomy-curiosity.jpg` | Astronomy, night sky, telescope, or curiosity photo |
| H-03 | `/portfolio_images/hobbies/fitness-sports.jpg` | Gym, running, football, volleyball, track, or active lifestyle photo |
| H-04 | `/portfolio_images/hobbies/travel-reflection.jpg` | Study abroad, travel, city view, lake, or reflective moment |
| H-05 | `/portfolio_images/hobbies/hands-on-building.jpg` | Robotics lab, Lego/building, electronics bench, 3D printing, or tools |
| H-06 | `/portfolio_images/hobbies/community-mentoring.jpg` | Workshop, coaching, public speaking, leadership, or community event photo |


## About page achievements section
Route: `src/routes/about.tsx`

| Slot | Path | What to place there |
|---|---|---|
| A-01 | `/portfolio_images/achievements/starkhacks-observ-e-win.jpg` | StarkHacks award, OBSERV-E demo, team, hackathon, or showcase image |
| A-02 | `/portfolio_images/achievements/itr-leadership.jpg` | Illinois Tech Robotics leadership, lab, GBM, project, or team photo |
| A-03 | `/portfolio_images/achievements/ecocar-autonomy.jpg` | EcoCAR, vehicle, RTMaps, sensor, CAN, autonomy, or testing image |
| A-04 | `/portfolio_images/achievements/leadership-community.jpg` | Speaking, networking, mentorship, public safety, or community event photo |
| A-05 | `/portfolio_images/achievements/guitar-honors.jpg` | Guitar competition, certificate, performance, award, or music photo |
| A-06 | `/portfolio_images/achievements/workshop-mentoring.jpg` | Classroom, robotics workshop, whiteboard, mentoring, or teaching photo |

## Autonomous Vehicles page
Route: `src/routes/autonomous-vehicles.tsx`

| Slot | Path | What to place there |
|---|---|---|
| AV-01 | `/portfolio_images/autonomy/av-hero.jpg` | Strong hero photo of you, a vehicle, autonomy lab, robotics/autonomy setup, or EcoCAR work |
| AV-02 | `/portfolio_images/autonomy/av-pipeline.jpg` | Diagram: sensors → perception → fusion → planning → control → validation |
| AV-03 | `/portfolio_images/autonomy/sensor-setup.jpg` | Camera, LiDAR/radar setup, sensor stack, or lab hardware |
| AV-04 | `/portfolio_images/autonomy/realtime-tools.jpg` | RTMaps, CAN signal work, simulation logs, validation tools, or control software screenshot |
| AV-05 | `/portfolio_images/autonomy/lane-rl-result.jpg` | Lane detection, RL driving, road segmentation, or simulator result |
| AV-06 | `/portfolio_images/autonomy/team-testing.jpg` | Team, testing, competition, lab, or vehicle-side photo |
| AV-07 | `/portfolio_images/autonomy/validation-results.jpg` | Plot, dashboard, confusion matrix, data table, driving test result, or before/after comparison |
| AV-08 | `/portfolio_images/autonomy/mission-impact.jpg` | People-centered image showing accessibility, safety, mobility, mentoring, or community impact |

## Gallery page
Route: `src/routes/gallery.tsx`

| Slot | Path | What to place there |
|---|---|---|
| G-01 | `/portfolio_images/gallery/featured-01.jpg` | Strongest image you want people to remember first |
| G-02 | `/portfolio_images/gallery/featured-02.jpg` | Second major portfolio moment |
| G-03 | `/portfolio_images/gallery/robotics-lab-action.jpg` | Robotics lab action, wiring, CAD, hardware, soldering, or testing |
| G-04 | `/portfolio_images/gallery/autonomous-vehicle-work.jpg` | EcoCAR, autonomy, sensor fusion, lane detection, simulation, or vehicle testing |
| G-05 | `/portfolio_images/gallery/leadership-moment.jpg` | Leading, speaking, hosting, organizing, or representing a group |
| G-06 | `/portfolio_images/gallery/hackathon-competition.jpg` | Hackathon, robotics competition, demo day, award, or build sprint |
| G-07 | `/portfolio_images/gallery/professional-event.jpg` | Networking, career bootcamp, conference, mentorship, or professional event |
| G-08 | `/portfolio_images/gallery/project-screenshot.jpg` | Web app, AI tool, dashboard, Streamlit app, portfolio feature, or product UI screenshot |
| G-09 | `/portfolio_images/gallery/technical-diagram.jpg` | Pipeline, system architecture, information model, signal flow, or ML workflow diagram |
| G-10 | `/portfolio_images/gallery/mentorship-teaching.jpg` | Workshop, tutoring, coaching, robotics training, or community teaching |
| G-11 | `/portfolio_images/gallery/music-guitar.jpg` | Guitar, performance, music memory, or creative hobby photo |
| G-12 | `/portfolio_images/gallery/astronomy-curiosity.jpg` | Sky, telescope, planetarium, stargazing, or curiosity photo |
| G-13 | `/portfolio_images/gallery/travel-reflection.jpg` | Travel, study abroad, city view, lake/mountain, or perspective-shaping memory |
| G-14 | `/portfolio_images/gallery/fitness-sports.jpg` | Football, volleyball, track, gym, running, or discipline outside engineering |
| G-15 | `/portfolio_images/gallery/friends-team-culture.jpg` | Team photo, friends at an event, robotics group, or collaboration moment |
| G-16 | `/portfolio_images/gallery/community-impact.jpg` | Public safety, youth commission, service, outreach, or community impact |
| G-17 | `/portfolio_images/gallery/behind-the-scenes.jpg` | Candid work-in-progress: desk, whiteboard, laptop, workshop table, debugging session |
| G-18 | `/portfolio_images/gallery/open-slot.jpg` | Any additional image you want people to see |

## How to run

```bash
npm install --include=optional
npm run dev
```

## How to verify production build

```bash
npm run build
```

## Stack Map page image slots

These are in `src/routes/stack-map.tsx`.

```txt
SM-01  /portfolio_images/stackmap/stackmap-hero.jpg
SM-02  /portfolio_images/stackmap/systems-diagram.jpg
SM-03  /portfolio_images/stackmap/workstation-stack.jpg
```

Each Stack Map card can also use an optional per-skill image with this pattern:

```txt
SM-<skill-slug>  /portfolio_images/stackmap/<skill-slug>.jpg
```

Examples:

```txt
SM-python                 /portfolio_images/stackmap/python.jpg
SM-computer-vision        /portfolio_images/stackmap/computer-vision.jpg
SM-sensor-fusion          /portfolio_images/stackmap/sensor-fusion.jpg
SM-microsoft-graph-api    /portfolio_images/stackmap/microsoft-graph-api.jpg
```


## Achievement feature image

```txt
A-07  /portfolio_images/achievements/intelligent-systems-safer-roads.jpg
```

Use the Illinois Tech article image, a LinkedIn post screenshot, an EcoCAR/autonomy photo, or a clean safer-autonomy graphic.
