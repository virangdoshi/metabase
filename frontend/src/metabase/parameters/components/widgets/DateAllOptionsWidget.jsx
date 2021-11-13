/* eslint-disable react/prop-types */
import React, { Component } from "react";
import cx from "classnames";
import { t } from "ttag";
import DatePicker, {
  DATE_OPERATORS,
  getOperator,
} from "metabase/query_builder/components/filters/pickers/DatePicker";
import FilterOptions from "metabase/query_builder/components/filters/FilterOptions";
import { generateTimeFilterValuesDescriptions } from "metabase/lib/query_time";
import { dateParameterValueToMBQL } from "metabase/parameters/utils/mbql";

import type { OperatorName } from "metabase/query_builder/components/filters/pickers/DatePicker";
import type {
  FieldFilter,
  LocalFieldReference,
} from "metabase-types/types/Query";
import { Container, Footer, UpdateButton } from "./DateWidget.styled";

type UrlEncoded = string;

// Use a placeholder value as field references are not used in dashboard filters
const noopRef: LocalFieldReference = null;

function getFilterValueSerializer(
  func: (val1: string, val2: string) => UrlEncoded,
) {
  return filter => func(filter[2], filter[3], filter[4] || {});
}

const serializersByOperatorName: {
  [id: OperatorName]: (FieldFilter) => UrlEncoded,
} = {
  previous: getFilterValueSerializer(
    (value, unit, options = {}) =>
      `past${-value}${unit}s${options["include-current"] ? "~" : ""}`,
  ),
  next: getFilterValueSerializer(
    (value, unit, options = {}) =>
      `next${value}${unit}s${options["include-current"] ? "~" : ""}`,
  ),
  current: getFilterValueSerializer((_, unit) => `this${unit}`),
  before: getFilterValueSerializer(value => `~${value}`),
  after: getFilterValueSerializer(value => `${value}~`),
  on: getFilterValueSerializer(value => `${value}`),
  between: getFilterValueSerializer((from, to) => `${from}~${to}`),
};

function getFilterOperator(filter) {
  return DATE_OPERATORS.find(op => op.test(filter));
}
function filterToUrlEncoded(filter: FieldFilter): ?UrlEncoded {
  const operator = getFilterOperator(filter);

  if (operator) {
    return serializersByOperatorName[operator.name](filter);
  } else {
    return null;
  }
}

const prefixedOperators: Set<OperatorName> = new Set([
  "before",
  "after",
  "on",
  "empty",
  "not-empty",
]);
function getFilterTitle(filter) {
  const desc = generateTimeFilterValuesDescriptions(filter).join(" - ");
  const op = getFilterOperator(filter);
  const prefix =
    op && prefixedOperators.has(op.name) ? `${op.displayName} ` : "";
  return prefix + desc;
}

type Props = {
  setValue: (value: ?string) => void,
  onClose: () => void,
  disableOperatorSelection: boolean,
};

type State = { filter: FieldFilter };

export default class DateAllOptionsWidget extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      filter:
        props.value != null
          ? dateParameterValueToMBQL(props.value, noopRef) || []
          : [],
    };
  }

  static propTypes = {};
  static defaultProps = {};

  static format = (urlEncoded: ?string) => {
    if (urlEncoded == null) {
      return null;
    }
    const filter = dateParameterValueToMBQL(urlEncoded, noopRef);

    return filter ? getFilterTitle(filter) : null;
  };

  commitAndClose = () => {
    this.props.setValue(filterToUrlEncoded(this.state.filter));
    this.props.onClose();
  };

  setFilter = (filter: FieldFilter) => {
    this.setState({ filter });
  };

  isValid() {
    const filterValues = this.state.filter.slice(2);
    return filterValues.every(value => value != null);
  }

  render() {
    const { filter } = this.state;
    const { disableOperatorSelection } = this.props;
    return (
      <Container>
        <DatePicker
          className="m2"
          filter={this.state.filter}
          onFilterChange={this.setFilter}
          hideEmptinessOperators
          hideTimeSelectors
          disableOperatorSelection={disableOperatorSelection}
        />
        <Footer>
          <FilterOptions
            filter={filter}
            onFilterChange={this.setFilter}
            operator={getOperator(filter)}
          />
          <UpdateButton
            className={cx({
              disabled: !this.isValid(),
            })}
            onClick={this.commitAndClose}
          >
            {t`Update filter`}
          </UpdateButton>
        </Footer>
      </Container>
    );
  }
}
