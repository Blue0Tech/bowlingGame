AFRAME.registerComponent('balls',{
    shootBullet: function() {
        window.addEventListener('keydown',e=>{
            if(e.key=='z') {
                var bullet = document.createElement('a-entity');
                bullet.setAttribute('geometry',{
                    primitive: 'sphere',
                    radius: 0.35
                });
                bullet.setAttribute('material',{
                    color: 'black'
                });
                var cam = document.querySelector('#camera');
                var pos = cam.getAttribute('position');
                bullet.setAttribute('position',pos);
                var camera = document.querySelector('#camera').object3D;
                var direction = new THREE.Vector3();
                camera.getWorldDirection(direction);
                // var cursor = document.querySelector('#cursor');
                // var cursorPos = cursor.getAttribute('position');
                // var resultPos = {
                //     x: cursorPos.x-pos.x,
                //     y: cursorPos.y-pos.y,
                //     z: cursorPos.z-pos.z
                // };
                // bullet.setAttribute('velocity',resultPos);
                bullet.setAttribute('velocity',direction.multiplyScalar(-10));
                var scene = document.querySelector('#scene');
                bullet.setAttribute('dynamic-body',{
                    mass: 30
                });
                scene.appendChild(bullet);
                // cam.appendChild(bullet);
            };
        });
    },
    init: function() {
        this.shootBullet();
    },
    // tick: function() {
    //     var camera = document.querySelector('#camera');
    //     var rotation = camera.getAttribute('rotation');
    //     rotation.y+=180;
    //     rotation.x*=-1;
    //     var gun = document.querySelector('#gunEntity');
    //     gun.setAttribute('rotation',rotation);
    //     gun.setAttribute('position',camera.getAttribute('position'));
    // }x
});