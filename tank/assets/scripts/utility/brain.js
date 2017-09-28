/**
 * Created by chuhaoyuan on 2017/9/28.
 */
import Neuron from './neuron'
const Brain = function () {
  let that = {};

  let _neuron = Neuron();


  let time = 0;
  let _behaviour = undefined;

  const BehaviourList = ["moveforword","rotationleft","moveback","rotationright","shoot"];


  that.getBehaviour = function (dt) {

    if (time >= Math.random() * 2 + 1){
      time = 0;
      _behaviour = BehaviourList[Math.round(Math.random() * BehaviourList.length - 1)];

    }else {
      time += dt
    }

    if (_behaviour === "shoot"){
      time = 3;
    }
    return _behaviour;

  };
  return that;
};
export default Brain;