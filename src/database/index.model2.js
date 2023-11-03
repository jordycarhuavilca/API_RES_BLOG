const { DataTypes } = require("sequelize");
const sequelize = require("../DB_connect");

const user = sequelize.define(
  "user",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nameUser: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    motherLastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fatherLastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "defaul.png",
    },
    typeUser: {
      type: DataTypes.STRING,
      defaultValue: userType[0],
      validate: {
        isIn: [userType],
      },
    },
    state: {
      type: DataTypes.STRING,
      defaultValue: userState[0],
      validate: {
        isIn: [userState],
      },
    },
  },
  {
    timestamps: false,
  }
);
const course = sequelize.define(
  "course",
  {
    courseId: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: uuidv4(),
    },
    tittle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "default.png",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.now,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.now,
    },
    deletedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.now,
    },
    state: {
      type: DataTypes.STRING,
      defaultValue: courseState[2],
      validate: {
        isIn: [courseState],
      },
    },
  },
  {
    timestamps: false,
  }
);

const purchase = sequelize.describe(
  "purchase",
  {
    numpurchase: {
      type: DataTypes.STRING,
      defaultValue: uuidv4(),
    },

    // idCurso
    // idStudent
    metodo_pago: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["credit_card", "debit_card"]],
      },
    },
    paidDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    pricePaid: {
      type: DataTypes.DECIMAL(4, 2),
    },
  },
  { timestamps: false }
);
const courseDetails = sequelize.describe(
  "courseDetails",
  {
    hours: DataTypes.INTEGER,
    numExercise: DataTypes.INTEGER,
    articulos: DataTypes.INTEGER,
    recursosDescargable: DataTypes.INTEGER,
    certificacion: DataTypes.BOOLEAN,
  },
  { timestamps: false }
);
const comments = sequelize.define(
  "comments",
  {
    commentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      defaultValue: true,
    },
    description: DataTypes.TEXT,
    starts: {
      type: DataTypes.DECIMAL(2, 1),
      validate: {
        isWithinRange(value) {
          if (value < 1 || value > 5) {
            throw new Error(
              "Starts must be between 1 and 5 with up to 1 decimal place"
            );
          }
        },
      },
    },
    CommentDated: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
  },
  { timestamps: false }
);
user.belongsToMany(courses, {
  through: {
    model: "studentCourse",
    unique: false,
    scope: {
      courseAlias: "userId",
    },
    foreignKey: "userId",
    otherKey: "courseId",
  },
});
courses.belongsToMany(user, {
  through: {
    model: "studentCourse",
    unique: false,
    scope: {
      courseAlias: "courseId",
    },
    foreignKey: "courseId",
    otherKey: "userId",
  },
});

//this is when user is intructor
user.hasMany(courses, { foreignKey: "userId" });
courses.belongsTo(user, { foreignKey: "userId" });

user.hasMany(purchase, { foreignKey: "userId" });
purchase.belongsTo(user, { foreignKey: "userId" });

courses.hasMany(purchase, { foreignKey: "courseId" });
purchase.hasMany(courses, { foreignKey: "courseId" });

courses.hasOne(courseDetails, { foreignKey: "courseId" });
courseDetails.belongsTo(courses, { foreignKey: "courseId" });

user.hasMany(comments, { foreignKey: "userId" });
comments.belongsTo(user, { foreignKey: "userId" });

courses.hasMany(comments, { foreignKey: "courseId" });
comments.belongsTo(courses, { foreignKey: "courseId" });

module.exports = {
  sequelize
};
