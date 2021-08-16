AFRAME.registerComponent('balls',{
    schema: {
        handlingCollisions: {type:'bool',default:false},
        ballThrown: {type:'bool',default:false}
    },
    shootBullet: function() {
        window.addEventListener('keydown',e=>{
            if(e.key=='z' && this.data.ballThrown==false) {
                this.data.ballThrown=true;
                var ball = document.createElement('a-entity');
                ball.setAttribute('geometry',{
                    primitive: 'sphere',
                    radius: 0.35
                });
                ball.setAttribute('material',{
                    color: 'black'
                });
                var cam = document.querySelector('#camera');
                var pos = cam.getAttribute('position');
                ball.setAttribute('position',pos);
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
                ball.setAttribute('velocity',direction.multiplyScalar(-10));
                var scene = document.querySelector('#scene');
                ball.setAttribute('dynamic-body',{
                    mass: 60
                });
                ball.addEventListener('collide',this.handleCollision);
                scene.appendChild(ball);
                // cam.appendChild(bullet);
            };
        });
    },
    handleCollision: function(e) {
        var component = document.querySelector('#caller').getAttribute('balls');
        if(component.handlingCollisions==false) {
            var element = e.detail.target.el;
            var elementHit = e.detail.body.el;
            if(elementHit.id.includes('pin')) {
                setTimeout(function() {
                    var pins = document.querySelector('#pins');
                    var pinsLeft = document.querySelector('#pinsLeft');
                    for(var child of pins.children) {
                        var position = child.getAttribute('position');
                        var id = child.getAttribute('id');
                        if(position.y<0) {
                            child.remove();
                        }
                    };
                    pinsLeft.setAttribute('text',{
                        value: `${pins.children.length} pins left`
                    });
                    component.handlingCollisions = false;
                    component.ballThrown = false;
                },3000);
                element.removeEventListener('collide',this.handleCollision);
                component.handlingCollisions = true;
            }
        }
    },
    init: function() {
        this.shootBullet();
    }
});