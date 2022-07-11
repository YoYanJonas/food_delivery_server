import { Vendor } from "./../entity/vendor.entity";
import bcryptjs from "bcryptjs";
import { MyDataSource } from "../my-data-source";
import { faker } from "@faker-js/faker";

MyDataSource.initialize()
  .then(async () => {
    const passwordd = await bcryptjs.hash("123456789", 10);
    const vendorRepository = MyDataSource.getRepository(Vendor);

    for (let i = 0; i < 30; i++) {
      await vendorRepository.save({
        password: passwordd,
        name: faker.lorem.word(),
        phone: parseInt("989" + faker.random.numeric(9)),
        city: faker.address.cityName(),
        location: `${faker.random.numeric(5)}, ${faker.random.numeric(5)}}`,
        ranking: parseInt(faker.random.numeric()),
        email: faker.internet.email(),
        image: faker.image.food(640, 640, false),
      });
    }

    process.exit();
  })
  .catch((err) => console.log(err));
