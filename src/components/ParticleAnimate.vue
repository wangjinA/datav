<!--
 * @Author: 汪锦
 * @Date: 2021-02-19 17:14:44
 * @LastEditors: 汪锦
 * @LastEditTime: 2021-02-19 17:50:26
 * @Description: 粒子动画
-->
<template>
  <div class="ParticleAnimate">
    <canvas id="canvas"></canvas>

    <div style="position:absolute;bottom: 0; left: 0;">
      <button data-effect="ejection">弹射</button>
      <button data-effect="dispersed">分散</button>
    </div>
  </div>
</template>

<script>
// https://jsrun.net/tSwKp/edit
export default {
  name: "ParticleAnimate",
  mounted() {
    class Particle {
      constructor({ x = 0, y = 0, tx = 0, ty = 0, vx = 0, vy = 0, radius = 2, color = "#F00000" }) {
        // 当前坐标
        this.x = x;
        this.y = y;
        // 目标点坐标
        this.tx = tx;
        this.ty = ty;
        // 速度
        this.vx = vx;
        this.vy = vy;
        // 3d 坐标位置
        this.xpos = 0;
        this.ypos = 0;
        this.zpos = 0;
        this.vz = 0;
        // 比例
        this.scaleX = 1;
        this.scaleY = 1;
        // 是否显示
        this.visible = true;
        this.radius = radius;
        this.color = color;
      }
      draw(ctx) {
        if (this.visible) {
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.scale(this.scaleX, this.scaleY);
          ctx.fillStyle = this.color;
          // ctx.fillRect(0, 0, this.radius * 2, this.radius * 2)
          ctx.beginPath();
          ctx.arc(0, 0, this.radius, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
        return this;
      }
    }

    // 传入粒子对象绘制动画帧，并接受一个动画结束的回调
    function drawFrame(particles, finished) {
      drawFrame.timer = window.requestAnimationFrame(() => {
        drawFrame(particles, finished);
      });
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // 缓动系数
      const easing = 0.08;
      const finishedParticles = particles.filter((particle) => {
        // 当前坐标和目标点之间的距离
        const dx = particle.tx - particle.x;
        const dy = particle.ty - particle.y;
        // 速度
        let vx = dx * easing;
        let vy = dy * easing;

        // 当距离小于0.1表示粒子已完成动画
        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
          particle.finished = true;
          particle.x = particle.tx;
          particle.y = particle.ty;
        } else {
          particle.x += vx;
          particle.y += vy;
        }
        particle.draw(ctx);
        return particle.finished;
      });

      if (finishedParticles.length === particles.length) {
        window.cancelAnimationFrame(drawFrame.timer);
        finished && finished(particles);
      }
    }

    // 获取目标对象的像素点，space 用于稀释像素点，值越大返回的像素点越少
    function getPixels({ target, space = 5, callback }) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const viewWidth = window.innerWidth;
      const viewHeight = window.innerHeight;

      canvas.width = viewWidth;
      canvas.height = viewHeight;

      if (typeof target === "string") {
        // 绘制文字
        ctx.font = "150px bold";
        ctx.fillStyle = "#0990C5";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText(target, viewWidth / 2, viewHeight / 2);
      } else {
        // 绘制图片
        ctx.drawImage(
          target,
          (viewWidth - target.width) / 2,
          (viewHeight - target.height) / 2,
          target.width,
          target.height
        );
      }

      // 获取像素数据
      const { data, width, height } = ctx.getImageData(0, 0, viewWidth, viewHeight);
      const pixeles = [];
      // 遍历像素数据，用space减少取到的像素数据
      for (let x = 0; x < width; x += space) {
        for (let y = 0; y < height; y += space) {
          const pos = (y * width + x) * 4; // 每个像素点由 rgba 四个值组成，所以需要乘以4才能得到正确的位置
          // 只提取 rgba 中透明度大于0.5的像素，imageData 里 aplha 128等于 rgba 中 alpha 的 0.5
          if (data[pos + 3] > 128) {
            const pixele = { x, y, rgba: [data[pos], data[pos + 1], data[pos + 2], data[pos + 3]] };
            pixeles.push(callback ? callback(pixele) : pixele);
          }
        }
      }

      return pixeles;
    }

    // 创建粒子
    function createParticles({ target, radius, space }) {
      return getPixels({
        target,
        space,
        callback({ x, y, rgba }) {
          return new Particle({
            radius,
            x: Math.random() * (50 + window.innerWidth) - 50,
            y: Math.random() * (50 + window.innerHeight) - 50,
            tx: x,
            ty: y,
            color: `rgba(${rgba})`,
          });
        },
      });
    }

    function broken(particles, init, finished) {
      const vpX = canvas.width / 2;
      const vpY = canvas.height / 2;
      const fl = 250;
      const floor = canvas.height - 5;
      let gravity = 0;
      let bounce = 0;

      // init
      particles.forEach((particle) => {
        const {
          vx = 0,
          vy = 0,
          vz = 0,
          gravity: gravityValue = 0,
          bounce: bounceValue = 0,
        } = init();
        particle.vx = vx;
        particle.vy = vy;
        particle.vz = vz;
        gravity = gravityValue;
        bounce = bounceValue;
      });

      function frame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        broken.timer = requestAnimationFrame(frame);

        particles = particles
          .filter((particle) => {
            particle.vy += gravity;
            particle.xpos += particle.vx;
            particle.ypos += particle.vy;
            particle.zpos += particle.vz;

            if (particle.ypos > floor && bounce !== 0) {
              particle.ypos = floor;
              particle.vy *= bounce;
            }

            if (
              particle.zpos > -fl &&
              particle.zpos < fl * 3 &&
              Math.abs(particle.xpos) < canvas.width
            ) {
              const scale = fl / (fl + particle.zpos);
              particle.scaleX = particle.scaleY = scale;
              particle.x = vpX + particle.xpos * scale;
              particle.y = vpY + particle.ypos * scale;
              particle.visible = true;
            } else {
              particle.visible = false;
            }

            return particle.visible;
          })
          // 排序，先绘制zpos值最大的粒子（最小的粒子先绘制）
          .sort((a, b) => b.zpos - a.zpos)
          .map((particle) => {
            particle.draw(ctx);
            return particle;
          });

        if (particles.length === 0) {
          cancelAnimationFrame(broken.timer);
          finished && finished();
          console.log("end");
        }
      }
      frame();
    }

    const effect = {
      ejection() {
        return {
          vx: Math.random() * 10 - 5,
          vy: Math.random() * -8 - 4,
          vz: Math.random() * 4 - 2,
          gravity: 0.2,
          bounce: -0.4,
        };
      },
      dispersed() {
        return {
          vx: Math.random() * 10 - 5,
          vy: Math.random() * 10 - 5,
          vz: Math.random() * 10 - 8,
        };
      },
    };

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    drawFrame(
      createParticles({
        target: "数据可视化",
        radius: 3,
        space: 8,
      }),
      (particles) => {
        broken(particles, effect.ejection);
      }
    );

    document.body.addEventListener("click", (event) => {
      const effectName = event.target.getAttribute("data-effect");
      if (effectName && effect[effectName]) {
        cancelAnimationFrame(drawFrame.timer);
        cancelAnimationFrame(broken.timer);
        drawFrame(
          createParticles({
            target: "数据可视化",
            radius: 3,
            space: 8,
          }),
          (particles) => {
            broken(particles, effect[effectName]);
          }
        );
      }
    });
  },
};
</script>

<style lang="less" scoped></style>
