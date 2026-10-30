# Target Tracking and Aiming System in Complex Motion Environment
I was an algorithm designer and tester in my university's robotics team, participating in [Robomaster University Championships Competition](https://robomaster.com/en-US) (organized by Dajiang Innovation), progressing from provincial and regional competitions to the national finals.


During this experience, I 
- Developed a recognition algorithm using OpenCV and Object Detection Algorithms (both traditional method and advanced object detection method) for robust monocular and binocular camera ranging algorithm to track the target using corresponding coordinate conversion strategies (Perspective-n-Points, Bundle Adjustment Optimization, and conversion between different coordinate systems).
- Designed an object tracking and prediction algorithm based on various Kalman Filter schemes, such as KF, EKF, UKF, and other algorithm fusion. And enriched the strategies to fit different scenes better.
- Developed the functions of localization, navigation, obstacle avoidance, and others for unmanned control robots based on ROS and information fusion technology with multi-sensors to meet the functional requirements of autonomous movement and decision-making in complex environments.
- Was responsible for code management, parameter reading and finetuning, self-start script development, communication maintainence, and algorithm testing to ensure system stability and performance.

## Videos

Here are some videos during testing and real performance.

The Figure shows the UI of our robots when the target mobile armor was moving in both X, Y directions with different moving speeds.
Green notation meanings:

1. tracking: Now, the robot is tracking the same enemy robot.

2. target_X, target_Y, target_Z: The world coordinate after conversion of the enemy armor center.

3. final_yaw, final_pitch: The solved enemy's yaw and pitch in world coodrinate.

4. Armor_Type: 0 represents small size of armor, 1 represents big size of armor.

5. no gyro!: The target armor's motion is not in the "gyro" mode(which means doing self-rotation).

6. dir: right represents the target is moving right in the UI.

7. bullet_speed: the set bullet speed of our robot.

8. msg,yaw: The YAW-message sent to the control board.

9. point on the armor:
    - green: the current center
    - red: the predicted center in the future timestep
    - circle: the predicted circle of the landing point of the bullet
10. white cross-line (on the armor): the aborted target
  
<video width="640" height="360" controls style="display: block; margin: 20px auto;">
  <source src="./test.mp4" type="video/mp4">
  Fig1: Mobile Armor Plate Recognition, Coordinate Computation, and Tracking UI Interface
</video>

This Figure shows the performance of our robot shooting the outpost (one kind of devices in the competition). The successful rate is 100%.
<video width="640" height="360" controls style="display: block; margin: 20px auto;">
  <source src="./demo1-1.mp4" type="video/mp4">
  The performance of the shooting algorithms.
</video>


<video width="640" height="360" controls style="display: block; margin: 20px auto;">
  <source src="./demo2-1.mp4" type="video/mp4">
</video>

Below are some of the live streamings of one game in the National Robomaster Finals. 
<video width="640" height="360" controls style="display: block; margin: 20px auto;">
  <source src="./real.mp4" type="video/mp4">
  Our team is the red side, you can focus on two number-five robots having one-to-one shooting.
</video>

<!-- <video width="640" height="360" controls style="display: block; margin: 20px auto;">
  <source src="./real.mp4" type="video/mp4">
  First-view UI videos showcasing the target infomation and shooting solution.
</video> -->

<div style="text-align: center;">
  <div style="display: flex; justify-content: center; gap: 20px;">
    <video width="480" height="240" controls>
      <source src="./ui1-1.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <video width="320" height="240" controls>
      <source src="./ui2-1.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
  <h6>First-view UI videos showcasing the target infomation and auto-aiming solution.</h6>
</div>

<!-- <div style="display: flex; justify-content: center; gap: 20px;">

  <video width="320" height="240" controls>
    <source src="video1.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <video width="320" height="240" controls>
    <source src="video2.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div> -->
