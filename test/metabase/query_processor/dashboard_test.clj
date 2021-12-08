(ns metabase.query-processor.dashboard-test
  "There are more e2e tests in [[metabase.api.dashboard-test]]."
  (:require [clojure.test :refer :all]
            [metabase.api.dashboard-test :as api.dashboard-test]
            [metabase.query-processor.dashboard :as qp.dashboard]
            [metabase.test :as mt]))

;; there are more tests in [[metabase.api.dashboard-test]]

(deftest resolve-parameters-validation-test
  (api.dashboard-test/with-chain-filter-fixtures [{{dashboard-id :id} :dashboard, {card-id :id} :card}]
    (letfn [(resolve-params [params]
              (#'qp.dashboard/resolve-params-for-query dashboard-id card-id params))]
      (testing "Valid parameters"
        (is (= [{:type   :category
                 :id     "_PRICE_"
                 :value  4
                 :target [:dimension [:field (mt/id :venues :price) nil]]}]
               (resolve-params [{:id "_PRICE_", :value 4}]))))
      (testing "Should error if parameter doesn't exist"
        (is (thrown-with-msg?
             clojure.lang.ExceptionInfo
             #"Dashboard does not have a parameter with ID \"_THIS_PARAMETER_DOES_NOT_EXIST_\".*"
             (resolve-params [{:id "_THIS_PARAMETER_DOES_NOT_EXIST_", :value 3}]))))
      (testing "Should error if parameter is of a different type"
        (is (thrown-with-msg?
             clojure.lang.ExceptionInfo
             #"Invalid parameter type :number/!= for parameter \"_PRICE_\".*"
             (resolve-params [{:id "_PRICE_", :value 4, :type :number/!=}])))))))
