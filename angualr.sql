/*
Navicat MySQL Data Transfer

Source Server         : connection
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : angualr

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2015-11-04 17:55:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_goods
-- ----------------------------
DROP TABLE IF EXISTS `t_goods`;
CREATE TABLE `t_goods` (
  `id` int(11) NOT NULL DEFAULT '0' COMMENT '代理主键',
  `g_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `g_pic` varchar(255) DEFAULT NULL,
  `g_description` varchar(255) DEFAULT NULL,
  `g_name` varchar(60) NOT NULL COMMENT '商品名称',
  `g_price` float(10,0) NOT NULL COMMENT '商品单价',
  `g_store_num` int(11) NOT NULL DEFAULT '0' COMMENT '库存数量',
  `g_type` int(11) NOT NULL COMMENT '商品类别',
  `g_note` varchar(60) DEFAULT NULL,
  `g_operator` int(11) DEFAULT NULL,
  `g_status` int(11) DEFAULT NULL,
  `g_add_date` datetime DEFAULT NULL,
  `g_modify_date` datetime DEFAULT NULL,
  PRIMARY KEY (`g_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_goods
-- ----------------------------
INSERT INTO `t_goods` VALUES ('1', '1', 'images/good_pic.jpg', '第三方是的双方都', '精品语句', '36', '33', '1', '333', '4', '1', '2015-11-16 09:40:49', '2015-11-16 09:40:49');
INSERT INTO `t_goods` VALUES ('0', '2', 'images/good_pic.jpg', '的地方', '的说法都是', '33', '0', '1', '第三方史蒂夫', '4', '2', '2015-11-16 09:40:49', '2015-11-16 09:40:49');
INSERT INTO `t_goods` VALUES ('0', '3', 'images/good_pic.jpg', '韩国国会', '的说法都ddd', '12', '0', '1', '第三方史蒂夫', '4', '3', '2015-11-16 09:40:49', '2015-11-16 09:40:49');
INSERT INTO `t_goods` VALUES ('0', '4', 'images/good_pic.jpg', '33的', '的说法都是hh', '444', '0', '1', '第三方史蒂夫', '4', '2', '2015-11-16 09:40:49', '2015-11-16 09:40:49');
INSERT INTO `t_goods` VALUES ('0', '5', 'images/good_pic.jpg', '梵蒂冈后悔个', '的说dsffds都是f', '23', '0', '1', '第三方史蒂夫', '4', '1', '2015-11-16 09:40:49', '2015-11-16 09:40:49');
INSERT INTO `t_goods` VALUES ('0', '6', 'images/good_pic.jpg', '第三方反倒是', '的说法都是sss', '85', '0', '1', '第三方史蒂夫', '4', '2', '2015-11-16 09:40:49', '2015-11-16 09:40:49');
INSERT INTO `t_goods` VALUES ('0', '7', 'images/good_pic.jpg', '哈哈哈发', '的说法ddd是', '6', '0', '1', '第三方史蒂夫', '4', '1', '2015-11-16 09:40:49', '2015-11-16 09:40:49');
INSERT INTO `t_goods` VALUES ('0', '8', 'images/good_pic.jpg', '合伙人地方', '的说s都是', '677', '0', '1', '第三方史蒂夫', '4', '1', '2015-11-16 09:40:49', '2015-11-16 09:40:49');
INSERT INTO `t_goods` VALUES ('0', '9', 'images/good_pic.jpg', '尺寸腹股沟', 'ddddd', '324', '0', '4', '的地方', '4', '1', '2015-11-16 09:40:49', '2015-11-16 09:40:49');
INSERT INTO `t_goods` VALUES ('0', '10', 'images/good_pic.jpg', '到底是', 'dd f', '3546', '0', '1', 'sdf ', '4', '1', '2015-11-16 09:40:49', '2015-11-16 09:40:49');
INSERT INTO `t_goods` VALUES ('0', '11', 'images/good_pic.jpg', '广告公司', 'dd3', '1', '0', '1', 'dd', '4', '1', '2015-11-16 09:40:49', '2015-11-16 09:40:49');
INSERT INTO `t_goods` VALUES ('0', '12', 'images/good_pic.jpg', '叼叼哒天然呆', '咯咯咯大的', '6564', '0', '1', 'dd', '4', '1', '2015-11-16 09:40:49', '2015-11-16 09:40:49');
INSERT INTO `t_goods` VALUES ('0', '13', 'images/good_pic.jpg', '叼叼哒说过话', '杆包', '500', '0', '3', '嗯，质量还不错的说', '4', '1', '2015-11-16 09:40:49', '2015-11-16 09:40:49');

-- ----------------------------
-- Table structure for t_order
-- ----------------------------
DROP TABLE IF EXISTS `t_order`;
CREATE TABLE `t_order` (
  `id` int(11) DEFAULT NULL,
  `g_order_id` int(11) NOT NULL AUTO_INCREMENT,
  `g_order_goods` int(11) DEFAULT NULL,
  `g_ceate_date` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `note` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`g_order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_order
-- ----------------------------
INSERT INTO `t_order` VALUES (null, '1', '1', '2015-10-07 17:41:06', '3', '的第三方发生的三都赋');
INSERT INTO `t_order` VALUES (null, '2', '2', '2015-10-20 17:41:44', '3', '和嘎嘎嘎');
INSERT INTO `t_order` VALUES (null, '3', '3', '2015-10-13 17:42:23', '3', '的冬瓜发生的色粉');
INSERT INTO `t_order` VALUES (null, '4', '1', '2015-10-13 17:42:28', '3', '打三分让他');
INSERT INTO `t_order` VALUES (null, '5', '2', '2015-11-04 17:42:31', '3', '忿忿地说');
INSERT INTO `t_order` VALUES (null, '6', '3', '2015-09-30 17:42:34', '3', '大的地方是');
INSERT INTO `t_order` VALUES (null, '7', '2', '2015-11-04 17:42:31', '3', '忿忿地说');
INSERT INTO `t_order` VALUES (null, '8', '3', '2015-09-30 17:42:34', '3', '大的地方是');
INSERT INTO `t_order` VALUES (null, '9', '2', '2015-11-04 17:42:31', '3', '忿忿地说');
INSERT INTO `t_order` VALUES (null, '10', '3', '2015-09-30 17:42:34', '3', '大的地方是');
INSERT INTO `t_order` VALUES (null, '11', '2', '2015-11-04 17:42:31', '3', '忿忿地说');
INSERT INTO `t_order` VALUES (null, '12', '3', '2015-09-30 17:42:34', '3', '大的地方是');
INSERT INTO `t_order` VALUES (null, '13', '2', '2015-11-04 17:42:31', '3', '忿忿地说');
INSERT INTO `t_order` VALUES (null, '14', '3', '2015-09-30 17:42:34', '3', '大的地方是');
INSERT INTO `t_order` VALUES (null, '15', '2', '2015-11-04 17:42:31', '3', '忿忿地说');
INSERT INTO `t_order` VALUES (null, '16', '3', '2015-09-30 17:42:34', '3', '大的地方是');
INSERT INTO `t_order` VALUES (null, '17', '2', '2015-11-04 17:42:31', '3', '忿忿地说');
INSERT INTO `t_order` VALUES (null, '18', '3', '2015-09-30 17:42:34', '3', '大的地方是');
INSERT INTO `t_order` VALUES (null, '19', '2', '2015-11-04 17:42:31', '3', '忿忿地说');
INSERT INTO `t_order` VALUES (null, '20', '3', '2015-09-30 17:42:34', '3', '大的地方是');
INSERT INTO `t_order` VALUES (null, '21', '2', '2015-11-04 17:42:31', '3', '忿忿地说');
INSERT INTO `t_order` VALUES (null, '22', '3', '2015-09-30 17:42:34', '3', '大的地方是');
INSERT INTO `t_order` VALUES (null, '23', '2', '2015-11-04 17:42:31', '3', '忿忿地说');
INSERT INTO `t_order` VALUES (null, '24', '3', '2015-09-30 17:42:34', '3', '大的地方是');

-- ----------------------------
-- Table structure for t_order_goods
-- ----------------------------
DROP TABLE IF EXISTS `t_order_goods`;
CREATE TABLE `t_order_goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `g_order_id` int(11) NOT NULL,
  `g_goods_num` int(11) NOT NULL,
  `g_good_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_order_goods
-- ----------------------------
INSERT INTO `t_order_goods` VALUES ('2', '1', '3', '1');
INSERT INTO `t_order_goods` VALUES ('3', '2', '33', '2');
INSERT INTO `t_order_goods` VALUES ('4', '2', '12', '3');
INSERT INTO `t_order_goods` VALUES ('5', '3', '2', '3');
INSERT INTO `t_order_goods` VALUES ('6', '4', '343', '5');
INSERT INTO `t_order_goods` VALUES ('7', '5', '33', '2');
INSERT INTO `t_order_goods` VALUES ('8', '6', '22', '3');
INSERT INTO `t_order_goods` VALUES ('9', '7', '22', '6');
INSERT INTO `t_order_goods` VALUES ('10', '8', '22', '11');
INSERT INTO `t_order_goods` VALUES ('11', '9', '22', '6');
INSERT INTO `t_order_goods` VALUES ('12', '10', '22', '4');
INSERT INTO `t_order_goods` VALUES ('13', '11', '22', '2');
INSERT INTO `t_order_goods` VALUES ('14', '12', '22', '2');
INSERT INTO `t_order_goods` VALUES ('15', '13', '22', '6');
INSERT INTO `t_order_goods` VALUES ('16', '14', '22', '4');
INSERT INTO `t_order_goods` VALUES ('17', '15', '22', '8');
INSERT INTO `t_order_goods` VALUES ('18', '16', '22', '11');
INSERT INTO `t_order_goods` VALUES ('19', '17', '22', '4');
INSERT INTO `t_order_goods` VALUES ('20', '18', '22', '12');
INSERT INTO `t_order_goods` VALUES ('21', '19', '22', '12');
INSERT INTO `t_order_goods` VALUES ('22', '20', '22', '12');
INSERT INTO `t_order_goods` VALUES ('23', '21', '22', '12');
INSERT INTO `t_order_goods` VALUES ('24', '22', '22', '12');
INSERT INTO `t_order_goods` VALUES ('25', '23', '22', '12');
INSERT INTO `t_order_goods` VALUES ('26', '24', '22', '12');
INSERT INTO `t_order_goods` VALUES ('27', '21', '22', '12');
INSERT INTO `t_order_goods` VALUES ('28', '15', '223', '2');

-- ----------------------------
-- Table structure for t_type
-- ----------------------------
DROP TABLE IF EXISTS `t_type`;
CREATE TABLE `t_type` (
  `id` int(11) NOT NULL,
  `g_type_id` int(11) DEFAULT NULL,
  `g_type_name` varchar(60) DEFAULT NULL,
  `g_type_note` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_type
-- ----------------------------
INSERT INTO `t_type` VALUES ('1', '1', '鱼钩', 'yughou ');
INSERT INTO `t_type` VALUES ('2', '2', '鱼线', 'dd');
INSERT INTO `t_type` VALUES ('3', '3', '杆包', null);
INSERT INTO `t_type` VALUES ('4', '4', '饵料', null);
INSERT INTO `t_type` VALUES ('5', '5', '小工具', null);

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `register_time` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES (null, '3', '406892700', 'b9eefd0fab208483c2877960906bcd80', '徐怀远', '1445828308997', '1');
INSERT INTO `t_user` VALUES (null, '4', 'xhy', 'e10adc3949ba59abbe56e057f20f883e', '徐怀远', '1445834880962', '1');
