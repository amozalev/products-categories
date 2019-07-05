import unittest
from .test_cases.test_category import TestCategory
from .test_cases.test_product import TestProduct
from .test_cases.test_user import TestUser

testSuite = unittest.TestSuite()
testSuite.addTest(unittest.makeSuite(TestCategory))
testSuite.addTest(unittest.makeSuite(TestProduct))
testSuite.addTest(unittest.makeSuite(TestUser))

if __name__ == '__main__':
    runner = unittest.TextTestRunner(verbosity=2)
    runner.run(testSuite)
