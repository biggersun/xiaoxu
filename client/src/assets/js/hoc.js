function hoc(ComponentClass) {
    return class HOC extends ComponentClass {
        constructor(props) {
            super(props);

            this.handleChangePage = this.handleChangePage.bind(this);
            this.handleSearch = this.handleSearch.bind(this);
            this.handleShowModal = this.handleShowModal.bind(this);
            this.handleHideModal = this.handleHideModal.bind(this);
        }

        handleChangePage({ current: pageIndex }) {
            const { updateQuery } = this.props;

            updateQuery({ pageIndex });
        }

        handleSearch(params = {}) {
            const { replaceQuery } = this.props;

            replaceQuery(params);
        }

        handleShowModal(modal, values = { rowVal: {} }) {
            const { rowVal, ...others } = values;

            this.setState({
                ...others,
                [modal]: true,
                rowVal: { ...rowVal },
            });
        }

        handleHideModal(modal, others) {
            this.setState({
                ...others,
                [modal]: false,
            });
        }

        render() {
            return super.render();
        }
    };
}

export default hoc;
